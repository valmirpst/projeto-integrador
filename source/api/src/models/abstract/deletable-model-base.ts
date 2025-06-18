import { db } from "../../core/database";
import { IDeletableModel } from "../../interfaces/i-model";
import { StatusEnum } from "../primitives/enumerations";

export abstract class DeletableModelBase implements IDeletableModel {
  protected abstract tableName: string;
  protected abstract primaryKey: string;

  async deleteAsync(id: string): Promise<void> {
    const hasStatus = await this.hasStatusColumn();

    const query = hasStatus
      ? `
      UPDATE ${this.tableName}
      SET status = $1
      WHERE ${this.primaryKey} = $2
    `
      : `
      DELETE FROM ${this.tableName}
      WHERE ${this.primaryKey} = $1`;

    await db.query(query, hasStatus ? [StatusEnum.inativo, id] : [id]);
  }

  async existsAsync(id: string): Promise<boolean> {
    const query = `
      SELECT 1 FROM ${this.tableName}
      WHERE ${this.primaryKey} = $1
    `;

    const res = await db.query(query, [id]);
    return res.rowCount ? res.rowCount > 0 : false;
  }

  async hasStatusColumn(): Promise<boolean> {
    const res = await db.query(
      `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = $1 AND column_name = 'status'
  `,
      [this.tableName]
    );

    return res.rowCount ? res.rowCount > 0 : false;
  }
}
