import { db } from "../../core/database";
import { IDeletableModel } from "../../interfaces/i-model";

export abstract class DeletableModelBase implements IDeletableModel {
  protected abstract tableName: string;
  protected abstract primaryKey: string;

  async deleteAsync(id: string): Promise<void> {
    const query = `
      DELETE FROM ${this.tableName}
      WHERE ${this.primaryKey} = $1
    `;

    await db.query(query, [id]);
  }

  async existsAsync(id: string): Promise<boolean> {
    const query = `
      SELECT 1 FROM ${this.tableName}
      WHERE ${this.primaryKey} = $1
    `;

    const res = await db.query(query, [id]);
    return res.rowCount ? res.rowCount > 0 : false;
  }
}
