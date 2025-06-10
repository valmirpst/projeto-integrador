import { db } from "../core/database";
import { IModel } from "../interfaces/i-model";
import { QueryableModelBase } from "./abstract/queryable-model-base";
import { HistoricoEntity } from "./entities/historico-entity";
import { HistoricoFilter } from "./filters/historico-filter";
import { HistoricoSchema } from "./schemas/historico-schema";

export class HistoricoModel
  extends QueryableModelBase<HistoricoEntity, HistoricoFilter>
  implements IModel<HistoricoEntity, HistoricoFilter>
{
  protected primaryKey: string = "id";
  protected tableName: string = "historico";

  async createAsync(data: HistoricoSchema): Promise<HistoricoEntity> {
    const { isbn_livro, id_usuario, id_bibliotecario, status } = data;

    const id = crypto.randomUUID();

    const values = [id, isbn_livro, id_usuario, id_bibliotecario, status];

    const date = new Date(Date.now() - 3 * 60 * 60 * 1000); // Ajuste de fuso horário para UTC-3

    const livro = await db.query("SELECT isbn FROM livro WHERE isbn = $1", [isbn_livro]);
    if (livro.rowCount === 0) {
      throw new Error(`Livro com isbn ${isbn_livro} não encontrado.`);
    }

    const usuario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_usuario]);
    if (usuario.rowCount === 0) {
      throw new Error(`Usuário com id ${id_usuario} não encontrado.`);
    }

    const bibliotecario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_bibliotecario]);
    if (bibliotecario.rowCount === 0) {
      throw new Error(`Bibliotecário com id ${id_bibliotecario} não encontrado.`);
    }

    const query = `
      INSERT INTO historico(id, isbn_livro, id_usuario, id_bibliotecario, status, criado_em, atualizado_em)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;

    const res = await db.query<HistoricoEntity>(query, [...values, date, date]);

    return res.rows[0];
  }

  async updateAsync(id: string, data: HistoricoEntity): Promise<HistoricoEntity> {
    const { id: historicoId, isbn_livro, id_usuario, id_bibliotecario, status } = data;

    if (historicoId !== id) {
      throw new Error("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const livro = await db.query("SELECT isbn FROM livro WHERE isbn = $1", [isbn_livro]);
    if (livro.rowCount === 0) {
      throw new Error("Livro não encontrado.");
    }

    const usuario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_usuario]);
    if (usuario.rowCount === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const bibliotecario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_bibliotecario]);
    if (bibliotecario.rowCount === 0) {
      throw new Error("Bibliotecário não encontrado.");
    }

    const atualizado_em = new Date(Date.now() - 3 * 60 * 60 * 1000); // Ajuste de fuso horário para UTC-3

    const values = [isbn_livro, id_usuario, id_bibliotecario, atualizado_em, status, id];

    const query = `
      UPDATE historico
      SET isbn_livro = $1, id_usuario = $2, id_bibliotecario = $3, atualizado_em = $4, status = $5
      WHERE id = $6
      RETURNING *
  `;

    const res = await db.query<HistoricoEntity>(query, values);

    return res.rows[0];
  }
}
