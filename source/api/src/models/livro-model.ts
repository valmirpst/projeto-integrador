import { db } from "../core/database";
import { LivroEntity } from "./entities/livro-entity";

export class LivroModel {
  static async getAsync() {
    const query = "SELECT * FROM livro";
    const res = await db.query(query);
    return res.rows;
  }

  static async postAsync(livro: LivroEntity) {
    const { isbn } = livro;
    const values = [isbn];

    const query = `
      INSERT INTO livro(isbn)
      VALUES($1) RETURNING *
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async putAsync(isbn: string, livro: LivroEntity) {
    const {} = livro;
    const values = [isbn];

    const query = `
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async deleteAsync(isbn: string) {
    const values = [isbn];

    const query = `
      DELETE FROM livro
      WHERE isbn = $1
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async getByIsbnAsync(isbn: LivroEntity["isbn"]): Promise<LivroEntity | undefined> {
    const query = "SELECT * FROM livro WHERE isbn = $1";
    const res = await db.query(query, [isbn]);

    return res.rows[0];
  }
}
