import { CursoEntity } from "../models/entities/curso.entity";
import { CursoService } from "../services/curso.service";
import { ControllerBase } from "./abstract/base.controller";

export class CursoController extends ControllerBase<CursoEntity> {
  protected service = new CursoService();
  protected idParam: string = "id";
}
