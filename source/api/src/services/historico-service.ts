import { IModel } from "../interfaces/i-model";
import { IEntityService } from "../interfaces/i-service";
import { HistoricoEntity } from "../models/entities/historico-entity";
import { HistoricoModel } from "../models/historico-model";
import { ServiceBase } from "./abstract/service-base";

export class HistoricoService extends ServiceBase<HistoricoEntity> implements IEntityService<HistoricoEntity> {
  protected primaryKey: keyof HistoricoEntity = "id";
  protected entityName: string = "Histórico";
  protected model: IModel<HistoricoEntity> = new HistoricoModel();
}
