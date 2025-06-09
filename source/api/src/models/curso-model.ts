import { db } from "../core/database";
import { BadRequestError } from "../exceptions/errors";
import { IModel } from "../interfaces/i-model";
import { QueryableModelBase } from "./abstract/queryable-model-base";
import { CursoEntity } from "./entities/curso-entity";

export class CursoModel extends QueryableModelBase<CursoEntity> implements IModel<CursoEntity> {
  protected primaryKey: string = "id";
  protected tableName: string = "curso";

  async createAsync(data: CursoEntity): Promise<CursoEntity> {
    const { id, nome } = data;

    const values = [id, nome];

    const query = `
      INSERT INTO curso(id, nome)
      VALUES($1, $2) RETURNING *
    `;

    const res = await db.query<CursoEntity>(query, values);

    return { ...res.rows[0] };
  }

  async updateAsync(id: string, curso: CursoEntity): Promise<CursoEntity> {
    const { id: cursoId, nome } = curso;

    if (cursoId !== id) {
      throw new BadRequestError("O id enviado no parâmetro é diferente do enviado no corpo da requisição.");
    }

    const values = [nome, id];

    const query = `
      UPDATE curso
      SET nome = $1
      WHERE id = $2
      RETURNING *
  `;

    const res = await db.query<CursoEntity>(query, values);

    return { ...res.rows[0] };
  }
}
