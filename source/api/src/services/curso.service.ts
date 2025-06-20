import { IModel } from "../interfaces/i-model";
import { IEntityService } from "../interfaces/i-service";
import { CursoModel } from "../models/curso.model";
import { CursoEntity } from "../models/entities/curso.entity";
import { ServiceBase } from "./abstract/service-base";

export class CursoService extends ServiceBase<CursoEntity> implements IEntityService<CursoEntity> {
  protected primaryKey: keyof CursoEntity = "id";
  protected entityName: string = "Curso";
  protected model: IModel<CursoEntity> = new CursoModel();
}
