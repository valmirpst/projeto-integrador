import { db } from "../core/database";
import { LivroEntity } from "./entities/livro-entity";

export class LivroModel {
  static async getAsync() {
    const query = "SELECT * FROM livro";
    const res = await db.query(query);
    return res.rows;
  }

  static async postAsync(livro: LivroEntity) {
    const { isbn, descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img } = livro;
    const values = [isbn, descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img];

    const query = `
      INSERT INTO livro(isbn, descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async putAsync(isbn: string, livro: LivroEntity) {
    const { isbn: livroIsbn, descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img } = livro;

    if (livroIsbn !== isbn) {
      throw new Error("O ISBN enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const values = [descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img, isbn];

    const query = `
    UPDATE livro
    SET
      descricao = $1,
      edicao = $2,
      editora = $3,
      genero = $4,
      qtd_disponivel = $5,
      titulo = $6,
      caminho_img = $7
    WHERE isbn = $8
    RETURNING *
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
