import { UsuarioEntity } from "../models/entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";
import { ControllerBase } from "./abstract/base.controller";

export class UsuarioController extends ControllerBase<UsuarioEntity> {
  protected service = new UsuarioService();
  protected idParam: string = "id";
}
