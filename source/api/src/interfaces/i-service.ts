import QueryString from "qs";

export interface IEntityService<TEntity> {
  getAsync(queryParams?: QueryString.ParsedQs): Promise<TEntity[]>;
  createAsync(data: TEntity): Promise<TEntity>;
  getByIdAsync(id: string): Promise<TEntity | null>;
  updateAsync(id: string, data: TEntity): Promise<TEntity | null>;
  deleteAsync(id: string): Promise<void>;
}
