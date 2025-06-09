export interface IModel<TEntity, TFilter = Record<string, any>> {
  queryAsync(queryParams?: TFilter): Promise<TEntity[]>;
  queryByIdAsync(id: string): Promise<TEntity>;
  createAsync(data: TEntity): Promise<TEntity>;
  updateAsync(id: string, data: TEntity): Promise<TEntity>;
  deleteAsync(id: string): Promise<void>;
  existsAsync(id: string): Promise<boolean>;
}

export interface IDeletableModel {
  deleteAsync(id: string): Promise<void>;
  existsAsync(id: string): Promise<boolean>;
}

export interface IQueryableModel<TEntity> {
  queryAsync(): Promise<TEntity[]>;
  queryByIdAsync(id: string): Promise<TEntity>;
}
