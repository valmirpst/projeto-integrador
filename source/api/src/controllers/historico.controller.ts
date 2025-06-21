import { HistoricoEntity } from "../models/entities/historico.entity";
import { HistoricoService } from "../services/historico.service";
import { ControllerBase } from "./abstract/base.controller";

export class HistoricoController extends ControllerBase<HistoricoEntity> {
  protected service = new HistoricoService();
  protected idParam: string = "id";
}
