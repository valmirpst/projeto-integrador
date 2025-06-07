import { StatusEnum } from "../primitives/enumerations";

export class HistoricoEntity {
  public id!: string;
  public isbn_livro!: string;
  public id_usuario!: string;
  public id_bibliotecario!: string;
  public criado_em?: Date;
  public atualizado_em?: Date;
  public status: StatusEnum = StatusEnum.ativo;

  constructor(historico: HistoricoEntity) {
    Object.assign(this, historico);
  }
}
