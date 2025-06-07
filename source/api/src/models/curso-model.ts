import { db } from "../core/database";
import { CursoEntity } from "./entities/curso-entity";

export class CursoModel {
  static async getAsync() {
    const query = `
      SELECT * FROM curso
      ORDER BY id ASC
    `;

    const res = await db.query(query);

    const cursos = res.rows;

    return cursos;
  }

  static async postAsync(curso: CursoEntity) {
    const { id, nome } = curso;

    const values = [id, nome];

    const query = `
      INSERT INTO curso(id, nome)
      VALUES($1, $2) RETURNING *
    `;

    const res = await db.query(query, values);

    return { ...res.rows[0] };
  }

  static async putAsync(id: string, curso: CursoEntity) {
    const { id: cursoId, nome } = curso;

    if (cursoId !== id) {
      throw new Error("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const values = [nome, id];

    const query = `
      UPDATE curso
      SET nome = $1
      WHERE id = $2
      RETURNING *
  `;

    const res = await db.query(query, values);

    return { ...res.rows[0] };
  }

  static async deleteAsync(id: string) {
    const values = [id];

    const query = `
      DELETE FROM curso
      WHERE id = $1
    `;

    const res = await db.query(query, values);
    return res.rows[0];
  }

  static async getByIdAsync(id: CursoEntity["id"]): Promise<CursoEntity | undefined> {
    const query = "SELECT * FROM curso WHERE id = $1";
    const res = await db.query(query, [id]);

    if (res.rows.length === 0) return undefined;

    return res.rows[0];
  }
}
