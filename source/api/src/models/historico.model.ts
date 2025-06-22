import { db } from "../core/database";
import { IModel } from "../interfaces/i-model";
import { QueryableModelBase } from "./abstract/queryable-model-base";
import { HistoricoEntity } from "./entities/historico.entity";
import { HistoricoFilter } from "./filters/historico.filter";
import { PerfilEnum, StatusEnum } from "./primitives/enumerations";
import { perfilProperties } from "./primitives/helpers";
import { HistoricoSchema } from "./schemas/historico.schema";

export class HistoricoModel
  extends QueryableModelBase<HistoricoEntity, HistoricoFilter>
  implements IModel<HistoricoEntity, HistoricoFilter>
{
  protected primaryKey: string = "id";
  protected tableName: string = "historico";

  async createAsync(data: HistoricoSchema): Promise<HistoricoEntity> {
    const { isbn_livro, id_usuario, id_bibliotecario } = data;

    const id = crypto.randomUUID();

    const usuarioEmprestimos = await db.query("SELECT COUNT(*) FROM historico WHERE id_usuario = $1 AND status = $2", [
      id_usuario,
      StatusEnum.ativo,
    ]);

    const usuario = await db.query<{ id: string; perfil: PerfilEnum }>(
      "SELECT id, perfil FROM usuario WHERE id = $1 AND status = $2",
      [id_usuario, StatusEnum.ativo]
    );

    if (usuario.rowCount === 0) {
      throw new Error(`Usuário com id ${id_usuario} não encontrado.`);
    }

    const max = usuario.rows[0].perfil == PerfilEnum.aluno ? 3 : 5;
    if (usuarioEmprestimos.rows[0]?.count && usuarioEmprestimos.rows[0].count >= max) {
      throw new Error(`Usuário já possui ${usuarioEmprestimos.rows[0].count} livros emprestados.`);
    }

    const livro = await db.query<{ isbn: string; qtd_disponivel: number }>(
      "SELECT isbn, qtd_disponivel FROM livro WHERE isbn = $1 AND status = $2",
      [isbn_livro, StatusEnum.ativo]
    );

    if (livro.rowCount === 0) {
      throw new Error(`Livro com isbn ${isbn_livro} não encontrado.`);
    }

    if (livro.rows[0].qtd_disponivel <= 0) {
      throw new Error(`Livro com isbn ${isbn_livro} não está disponível .`);
    }

    const now = new Date(Date.now() - 3 * 60 * 60 * 1000); // Ajuste de fuso horário para UTC-3

    const pendencias = await db.query<{
      criado_em: Date;
      perfil: keyof typeof perfilProperties;
    }>(
      `
        SELECT historico.criado_em, usuario.perfil from historico 
        JOIN usuario ON historico.id_usuario = usuario.id
        WHERE historico.id_usuario = $1
        AND historico.status = $2
      `,
      [id_usuario, StatusEnum.ativo]
    );

    if (pendencias.rowCount && pendencias.rowCount > 0) {
      const perfil = perfilProperties[pendencias.rows[0].perfil];
      const prazoDevolucao = new Date(pendencias.rows[0].criado_em);
      prazoDevolucao.setDate(prazoDevolucao.getDate() + perfil.tempo_emprestimo_dias);

      if (now > prazoDevolucao) {
        throw new Error(`O usuário com id ${id_usuario} possui pendências e não pode emprestar livros.`);
      }
    }

    const values = [id, isbn_livro, id_usuario, id_bibliotecario];

    const bibliotecario = await db.query("SELECT id FROM usuario WHERE id = $1 AND status = $2", [
      id_bibliotecario,
      StatusEnum.ativo,
    ]);
    if (bibliotecario.rowCount === 0) {
      throw new Error(`Bibliotecário com id ${id_bibliotecario} não encontrado.`);
    }

    const query = `
      INSERT INTO historico(id, isbn_livro, id_usuario, id_bibliotecario, criado_em, atualizado_em)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;

    const res = await db.query<HistoricoEntity>(query, [...values, now, now]);

    await db.query("UPDATE livro SET qtd_disponivel = qtd_disponivel - 1 WHERE isbn = $1 AND status = $2", [
      isbn_livro,
      StatusEnum.ativo,
    ]);

    return res.rows[0];
  }

  async updateAsync(id: string, data: HistoricoEntity): Promise<HistoricoEntity> {
    const { id: historicoId, isbn_livro, id_usuario, id_bibliotecario } = data;

    if (historicoId !== id) {
      throw new Error("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const livro = await db.query("SELECT isbn FROM livro WHERE isbn = $1 AND status = $2", [isbn_livro, StatusEnum.ativo]);
    if (livro.rowCount === 0) {
      throw new Error("Livro não encontrado.");
    }

    const usuario = await db.query("SELECT id FROM usuario WHERE id = $1 AND status = $2", [id_usuario, StatusEnum.ativo]);
    if (usuario.rowCount === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const bibliotecario = await db.query("SELECT id FROM usuario WHERE id = $1 AND status = $2", [
      id_bibliotecario,
      StatusEnum.ativo,
    ]);
    if (bibliotecario.rowCount === 0) {
      throw new Error("Bibliotecário não encontrado.");
    }

    const atualizado_em = new Date(Date.now() - 3 * 60 * 60 * 1000); // Ajuste de fuso horário para UTC-3

    const values = [isbn_livro, id_usuario, id_bibliotecario, atualizado_em, id];

    const query = `
      UPDATE historico
      SET isbn_livro = $1, id_usuario = $2, id_bibliotecario = $3, atualizado_em = $4
      WHERE id = $5
      RETURNING *
  `;

    const res = await db.query<HistoricoEntity>(query, values);

    return res.rows[0];
  }
}
