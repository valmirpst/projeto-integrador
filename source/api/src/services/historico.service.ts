import { IModel } from "../interfaces/i-model";
import { IEntityService } from "../interfaces/i-service";
import { HistoricoEntity } from "../models/entities/historico.entity";
import { LivroEntity } from "../models/entities/livro.entity";
import { UsuarioEntity } from "../models/entities/usuario.entity";
import { HistoricoModel } from "../models/historico.model";
import { StatusEnum } from "../models/primitives/enumerations";
import { ServiceBase } from "./abstract/service-base";
import { EmailService } from "./external/email.service";
import { LivroService } from "./livro.service";
import { UsuarioService } from "./usuario.service";

export class HistoricoService extends ServiceBase<HistoricoEntity> implements IEntityService<HistoricoEntity> {
  protected primaryKey: keyof HistoricoEntity = "id";
  protected entityName: string = "Histórico";
  protected model: IModel<HistoricoEntity> = new HistoricoModel();

  override async createAsync(data: HistoricoEntity): Promise<HistoricoEntity> {
    const emailService = new EmailService();

    const historico = await super.createAsync(data);

    const { livro, usuario } = await this.getInfoForEmail(historico.id);

    const timestamp = new Date().toLocaleString("pt-BR");

    emailService.sendMail({
      to: usuario.email,
      subject: "Empréstimo de Livro",
      text: `O livro "${livro.titulo}" foi emprestado em ${timestamp}.\n\nObrigado por utilizar nosso serviço!`,
    });

    return historico;
  }

  override async deleteAsync(id: string): Promise<void> {
    const emailService = new EmailService();

    const { livro, usuario } = await this.getInfoForEmail(id);

    await super.deleteAsync(id);

    const timestamp = new Date().toLocaleString("pt-BR");

    emailService.sendMail({
      to: usuario.email,
      subject: "Devolução de Empréstimo",
      text: `O livro "${livro.titulo}" foi devolvido em ${timestamp}.\n\nObrigado por utilizar nosso serviço!`,
    });
  }

  private async getInfoForEmail(historicoId: string): Promise<{ livro: LivroEntity; usuario: UsuarioEntity }> {
    const usuarioService = new UsuarioService();
    const livroService = new LivroService();

    const historico = await super.getByIdAsync(historicoId);
    if (!historico) {
      throw new Error(`Histórico com ID ${historicoId} não encontrado.`);
    }
    if (historico.status !== StatusEnum.ativo) {
      throw new Error(`Empréstimo com ID ${historicoId} não está ativo.`);
    }

    const usuario = await usuarioService.getByIdAsync(historico.id_usuario);
    if (!usuario) {
      throw new Error(`Usuário com ID ${historico.id_usuario} não encontrado.`);
    }

    const livro = await livroService.getByIdAsync(historico.isbn_livro);
    if (!livro) {
      throw new Error(`Livro com ISBN ${historico.isbn_livro} não encontrado.`);
    }

    return { livro, usuario };
  }
}
