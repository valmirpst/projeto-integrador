import { db } from "../core/database";
import { HistoricoEntity } from "./entities/historico-entity";
import { HistoricoFilter } from "./filters/historico-filter";

export class HistoricoModel {
  static async getAsync(queryParams?: HistoricoFilter) {
    const queryParamsMap = Object.entries(queryParams || {});

    const query = `
      SELECT * FROM historico
      ${
        queryParamsMap.length > 0
          ? queryParamsMap.map(([key, value], i) => `${i === 0 ? "WHERE" : "AND"} ${key} = '${value}'`).join(" ")
          : ""
      }
      ORDER BY isbn_livro, id_usuario ASC
    `;

    const res = await db.query(query);

    return res.rows;
  }

  static async postAsync(historico: HistoricoEntity) {
    const { id, isbn_livro, id_usuario, id_bibliotecario, status } = historico;

    const values = [id, isbn_livro, id_usuario, id_bibliotecario, status];

    const date = new Date(Date.now() - 3 * 60 * 60 * 1000); // Ajuste de fuso horário para UTC-3

    const livro = await db.query("SELECT isbn FROM livro WHERE isbn = $1", [isbn_livro]);
    if (livro.rows.length === 0) {
      throw new Error(`Livro com isbn ${isbn_livro} não encontrado.`);
    }

    const usuario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_usuario]);
    if (usuario.rows.length === 0) {
      throw new Error(`Usuário com id ${id_usuario} não encontrado.`);
    }

    const bibliotecario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_bibliotecario]);
    if (bibliotecario.rows.length === 0) {
      throw new Error(`Bibliotecário com id ${id_bibliotecario} não encontrado.`);
    }

    const query = `
      INSERT INTO historico(id, isbn_livro, id_usuario, id_bibliotecario, status, criado_em, atualizado_em)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;

    const res = await db.query(query, [...values, date, date]);

    return { ...res.rows[0] };
  }

  static async putAsync(id: string, historico: HistoricoEntity) {
    const { id: historicoId, isbn_livro, id_usuario, id_bibliotecario, status } = historico;

    if (historicoId !== id) {
      throw new Error("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const livro = await db.query("SELECT isbn FROM livro WHERE isbn = $1", [isbn_livro]);
    if (livro.rows.length === 0) {
      throw new Error("Livro não encontrado.");
    }

    const usuario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_usuario]);
    if (usuario.rows.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const bibliotecario = await db.query("SELECT id FROM usuario WHERE id = $1", [id_bibliotecario]);
    if (bibliotecario.rows.length === 0) {
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

    const res = await db.query(query, values);

    return { ...res.rows[0] };
  }

  static async deleteAsync(id: string) {
    const values = [id];

    const query = `
      DELETE FROM historico
      WHERE id = $1
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async getByIdAsync(id: HistoricoEntity["id"]): Promise<HistoricoEntity | undefined> {
    const query = "SELECT * FROM historico WHERE id = $1";
    const res = await db.query(query, [id]);

    if (res.rows.length === 0) return undefined;

    return res.rows[0];
  }
}
