import { CursoEntity } from "../models/entities/curso.entity";
import { cursoSchema } from "../models/schemas/curso.schema";
import { CursoService } from "../services/curso.service";
import { ControllerBase } from "./abstract/base.controller";

export class CursoController extends ControllerBase<CursoEntity> {
  protected service = new CursoService();
  protected schema = cursoSchema;
  protected idParam: string = "id";
}
