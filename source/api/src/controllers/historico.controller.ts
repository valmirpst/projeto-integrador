import { HistoricoEntity } from "../models/entities/historico.entity";
import { historicoSchema } from "../models/schemas/historico.schema";
import { HistoricoService } from "../services/historico.service";
import { ControllerBase } from "./abstract/base.controller";

export class HistoricoController extends ControllerBase<HistoricoEntity, typeof historicoSchema> {
  protected service = new HistoricoService();
  protected schema = historicoSchema;
  protected idParam: string = "id";
}
