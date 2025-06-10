import { NotFoundError } from "../../exceptions/errors";
import { IModel } from "../../interfaces/i-model";
import { IEntityService } from "../../interfaces/i-service";

export abstract class ServiceBase<TEntity> implements IEntityService<TEntity> {
  protected abstract primaryKey: keyof TEntity;
  protected abstract entityName: string;
  protected abstract model: IModel<TEntity>;

  async getAsync(queryParams?: Record<string, any>): Promise<TEntity[]> {
    return this.model.queryAsync(queryParams);
  }

  async createAsync(data: TEntity): Promise<TEntity> {
    return this.model.createAsync(data);
  }

  async getByIdAsync(id: string): Promise<TEntity | null> {
    const exists = await this.model.existsAsync(id);
    if (!exists) {
      throw new NotFoundError(`${this.entityName} com ${String(this.primaryKey)} ${id} não encontrado.`);
    }
    return this.model.queryByIdAsync(id);
  }

  async updateAsync(id: string, data: TEntity): Promise<TEntity | null> {
    const exists = await this.model.existsAsync(id);
    if (!exists) {
      throw new NotFoundError(`${this.entityName} com ${String(this.primaryKey)} ${id} não encontrado.`);
    }
    return this.model.updateAsync(id, data);
  }

  async deleteAsync(id: string): Promise<void> {
    const exists = await this.model.existsAsync(id);
    if (!exists) {
      throw new NotFoundError(`${this.entityName} com ${String(this.primaryKey)} ${id} não encontrado.`);
    }
    await this.model.deleteAsync(id);
  }
}
