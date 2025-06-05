import { db } from "../core/database";
import { CursoEntity } from "./entities/curso-entity";

const perfilProperties: Record<
  string,
  {
    tempo_emprestimo_dias: number;
    valor_multa_dia: number;
  }
> = {
  "0": {
    tempo_emprestimo_dias: 30,
    valor_multa_dia: 5,
  },
  "1": {
    tempo_emprestimo_dias: 7,
    valor_multa_dia: 2,
  },
  "2": {
    tempo_emprestimo_dias: 14,
    valor_multa_dia: 7,
  },
};

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

    console.log(id, cursoId);
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
