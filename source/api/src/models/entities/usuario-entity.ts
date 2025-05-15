import { PerfilEnum } from "../primitives/enumerations";

export class UsuarioEntity {
  public id!: string;
  public ra?: string | null;
  public siape?: string | null;
  public nome!: string;
  public sobrenome!: string;
  public data_nasc!: string;
  public email?: string;
  public telefone!: string;
  public perfil!: PerfilEnum;

  constructor(livro: UsuarioEntity) {
    Object.assign(this, livro);
  }
}
