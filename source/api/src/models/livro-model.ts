import { db } from "../core/database";
import { LivroEntity } from "./entities/livro-entity";
import { CategoriaEnum } from "./primitives/enumerations";

export class LivroModel {
  static async getAsync() {
    const query = `
      SELECT livro.*, array_agg(livro_autor.nome_autor) as autores
      FROM livro
      JOIN livro_autor ON livro.isbn = livro_autor.isbn_livro
      GROUP BY livro.isbn
      ORDER BY livro.isbn ASC
    `;

    const res = await db.query(query);

    const categoriasQuery = `
      SELECT livro_categoria.nome_categoria as nome, livro_categoria.tipo
      FROM livro_categoria
      WHERE livro_categoria.isbn_livro = $1
    `;

    const livrosComCategorias = await Promise.all(
      res.rows.map(async livro => {
        const categoriasRes = await db.query(categoriasQuery, [livro.isbn]);
        return { ...livro, categorias: categoriasRes.rows };
      })
    );

    return livrosComCategorias;
  }

  static async postAsync(livro: LivroEntity) {
    const {
      isbn,
      descricao,
      edicao,
      editora,
      genero,
      qtd_disponivel,
      titulo,
      caminho_img,
      total_avaliacoes,
      total_estrelas,
      autores,
      categorias,
    } = livro;

    const values = [
      isbn,
      descricao,
      edicao,
      editora,
      genero,
      qtd_disponivel,
      titulo,
      caminho_img,
      total_avaliacoes,
      total_estrelas,
    ];

    const query = `
      INSERT INTO livro(isbn, descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img, total_avaliacoes, total_estrelas)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
    `;

    const res = await db.query(query, values);

    const livro_autor_query = `
        INSERT INTO livro_autor(isbn_livro, nome_autor)
        VALUES($1, $2)
      `;

    const livro_categoria_query = `
        INSERT INTO livro_categoria(isbn_livro, nome_categoria, tipo)
        VALUES($1, $2, $3)
      `;

    autores.forEach(async autor => await db.query(livro_autor_query, [isbn, autor]));
    categorias.forEach(async categoria => await db.query(livro_categoria_query, [isbn, categoria.nome, categoria.tipo]));

    return { ...res.rows[0], autores, categorias };
  }

  static async putAsync(isbn: string, livro: LivroEntity) {
    const {
      isbn: livroIsbn,
      descricao,
      edicao,
      editora,
      genero,
      qtd_disponivel,
      titulo,
      caminho_img,
      total_avaliacoes,
      total_estrelas,
      autores,
      categorias,
    } = livro;

    if (livroIsbn !== isbn) {
      throw new Error("O ISBN enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const values = [
      descricao,
      edicao,
      editora,
      genero,
      qtd_disponivel,
      titulo,
      caminho_img,
      total_avaliacoes,
      total_estrelas,
      isbn,
    ];

    const query = `
      UPDATE livro
      SET
        descricao = $1,
        edicao = $2,
        editora = $3,
        genero = $4,
        qtd_disponivel = $5,
        titulo = $6,
        caminho_img = $7,
        total_avaliacoes = $8,
        total_estrelas = $9
      WHERE isbn = $10
      RETURNING *
  `;

    const res = await db.query(query, values);

    let autores_string = "";
    autores.forEach((autor, i) => {
      autores_string += `${i == 0 ? "" : ","}'${autor}'`;
    });

    const livro_autor_query = `
      DELETE FROM livro_autor
      WHERE isbn_livro = '${isbn}';

      INSERT INTO livro_autor (isbn_livro, nome_autor)
      SELECT '${isbn}', unnest(array[${autores_string}]);
    `;

    await db.query(livro_autor_query);

    await db.query("DELETE FROM livro_categoria WHERE isbn_livro = $1", [isbn]);

    const livro_categoria_query = `
      INSERT INTO livro_categoria(isbn_livro, nome_categoria, tipo)
      VALUES($1, $2, $3)
    `;

    categorias.forEach(async categoria => {
      await db.query(livro_categoria_query, [isbn, categoria.nome, CategoriaEnum[categoria.tipo]]);
    });

    return { ...res.rows[0], autores, categorias };
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
    const query = `
      SELECT livro.*, array_agg(livro_autor.nome_autor) as autores
      FROM livro
      JOIN livro_autor ON livro.isbn = livro_autor.isbn_livro
      WHERE livro.isbn = $1
      GROUP BY livro.isbn
    `;

    const res = await db.query(query, [isbn]);

    const categoriasQuery = `
      SELECT livro_categoria.nome_categoria as nome, livro_categoria.tipo
      FROM livro_categoria
      WHERE livro_categoria.isbn_livro = $1
    `;

    const categoriasRes = await db.query(categoriasQuery, [isbn]);

    return { ...res.rows[0], categorias: categoriasRes.rows };
  }
}
