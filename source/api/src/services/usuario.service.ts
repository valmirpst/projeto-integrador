import { IModel } from "../interfaces/i-model";
import { IEntityService } from "../interfaces/i-service";
import { UsuarioEntity } from "../models/entities/usuario.entity";
import { UsuarioModel } from "../models/usuario.model";
import { ServiceBase } from "./abstract/service-base";

export class UsuarioService extends ServiceBase<UsuarioEntity> implements IEntityService<UsuarioEntity> {
  protected primaryKey: keyof UsuarioEntity = "id";
  protected entityName: string = "Usuário";
  protected model: IModel<UsuarioEntity> = new UsuarioModel();
}
