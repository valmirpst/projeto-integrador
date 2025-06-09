import { UsuarioEntity } from "../models/entities/usuario-entity";
import { usuarioSchema } from "../models/schemas/usuario-schema";
import { UsuarioService } from "../services/usuario-service";
import { ControllerBase } from "./abstract/controller-base";

export class UsuarioController extends ControllerBase<UsuarioEntity> {
  protected service = new UsuarioService();
  protected schema = usuarioSchema;
  protected idParam: string = "id";
}
