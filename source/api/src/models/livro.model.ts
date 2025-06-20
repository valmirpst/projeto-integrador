import { db } from "../core/database";
import { BadRequestError } from "../exceptions/errors";
import { IModel } from "../interfaces/i-model";
import { QueryableModelBase } from "./abstract/queryable-model-base";
import { LivroEntity } from "./entities/livro.entity";
import { CategoriaEnum } from "./primitives/enumerations";
import { Categoria } from "./schemas/livro.schema";

export class LivroModel extends QueryableModelBase<LivroEntity> implements IModel<LivroEntity> {
  protected primaryKey: string = "isbn";
  protected tableName: string = "livro";

  override async queryAsync(queryParams?: Record<string, any> | undefined): Promise<LivroEntity[]> {
    const data = await super.queryAsync(queryParams);

    const autoresQuery = `
      SELECT array_agg(livro_autor.nome_autor) as autores
      FROM livro_autor
      WHERE livro_autor.isbn_livro = $1
    `;

    const categoriasQuery = `
      SELECT livro_categoria.nome_categoria as nome, livro_categoria.tipo
      FROM livro_categoria
      WHERE livro_categoria.isbn_livro = $1
    `;

    const livros = await Promise.all(
      data.map(async livro => {
        const autoresRes = await db.query<{ autores: string[] }>(autoresQuery, [livro.isbn]);
        const categoriasRes = await db.query<Categoria>(categoriasQuery, [livro.isbn]);
        return { ...livro, autores: autoresRes.rows[0]?.autores || [], categorias: categoriasRes.rows };
      })
    );

    return livros;
  }

  async createAsync(data: LivroEntity): Promise<LivroEntity> {
    const values = [
      data.isbn,
      data.descricao,
      data.edicao,
      data.editora,
      data.genero,
      data.qtd_disponivel,
      data.titulo,
      data.caminho_img,
      data.total_avaliacoes,
      data.total_estrelas,
    ];

    const { isbn, autores, categorias } = data;

    const existingLivro = await db.query<LivroEntity>("SELECT * FROM livro WHERE isbn = $1", [isbn]);
    if (existingLivro.rowCount && existingLivro.rowCount > 0) {
      throw new BadRequestError(`Livro com ISBN ${isbn} já existe.`);
    }

    const query = `
      INSERT INTO livro(isbn, descricao, edicao, editora, genero, qtd_disponivel, titulo, caminho_img, total_avaliacoes, total_estrelas)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
    `;

    const res = await db.query<Omit<LivroEntity, "categorias" | "autores">>(query, values);

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

    const livro: LivroEntity = { ...res.rows[0], autores, categorias };

    return livro;
  }

  async updateAsync(id: string, data: LivroEntity): Promise<LivroEntity> {
    const values = [
      data.descricao,
      data.edicao,
      data.editora,
      data.genero,
      data.qtd_disponivel,
      data.titulo,
      data.caminho_img,
      data.total_avaliacoes,
      data.total_estrelas,
      id,
    ];

    const { isbn, autores, categorias, status } = data;

    if (isbn !== id) {
      throw new BadRequestError("O ISBN enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

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
        ${status != undefined ? `, status = '${status}'` : ""}
      WHERE isbn = $10
      RETURNING *
  `;

    const res = await db.query<LivroEntity>(query, values);

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

  override async queryByIdAsync(id: string): Promise<LivroEntity> {
    const data = await super.queryByIdAsync(id);

    const autoresQuery = `
      SELECT array_agg(livro_autor.nome_autor) as autores
      FROM livro_autor
      WHERE livro_autor.isbn_livro = $1
    `;

    const autoresRes = await db.query<{ autores: string[] }>(autoresQuery, [id]);

    const categoriasQuery = `
      SELECT livro_categoria.nome_categoria as nome, livro_categoria.tipo
      FROM livro_categoria
      WHERE livro_categoria.isbn_livro = $1
    `;

    const categoriasRes = await db.query<Categoria>(categoriasQuery, [id]);

    return { ...data, autores: autoresRes.rows[0]?.autores || [], categorias: categoriasRes.rows };
  }
}
