import { IModel } from "../interfaces/i-model";
import { IEntityService } from "../interfaces/i-service";
import { LivroEntity } from "../models/entities/livro.entity";
import { LivroModel } from "../models/livro.model";
import { ServiceBase } from "./abstract/service-base";

export class LivroService extends ServiceBase<LivroEntity> implements IEntityService<LivroEntity> {
  protected primaryKey: keyof LivroEntity = "isbn";
  protected entityName: string = "Livro";
  protected model: IModel<LivroEntity> = new LivroModel();
}
