import { QueryResultRow } from "pg";
import { db } from "../../core/database";
import { NotFoundError } from "../../exceptions/errors";
import { IQueryableModel } from "../../interfaces/i-model";
import { DeletableModelBase } from "./deletable-model-base";

export abstract class QueryableModelBase<TEntity extends QueryResultRow, TFilter = Record<string, any>>
  extends DeletableModelBase
  implements IQueryableModel<TEntity>
{
  async queryAsync(queryParams?: TFilter): Promise<TEntity[]> {
    const queryParamsMap = Object.entries(queryParams || {});

    const query = `
      SELECT * FROM ${this.tableName}
      ${
        queryParamsMap.length > 0
          ? queryParamsMap.map(([key, value], i) => `${i === 0 ? "WHERE" : "AND"} ${key} = '${value}'`).join(" ")
          : ""
      }
      ORDER BY ${this.primaryKey} ASC
    `;

    const res = await db.query<TEntity>(query);

    return res.rows;
  }

  async queryByIdAsync(id: string): Promise<TEntity> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE ${this.primaryKey} = $1
    `;

    const res = await db.query<TEntity>(query, [id]);

    const tableName = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1);
    if (res.rowCount === 0) throw new NotFoundError(`${tableName} não encontrado`);

    return res.rows[0];
  }
}
