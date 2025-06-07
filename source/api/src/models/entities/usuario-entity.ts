import { PerfilEnum } from "../primitives/enumerations";

export type Curso = {
  id: string;
  nome: string;
};

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
  public id_cursos: (string | null | undefined)[] = [];

  constructor(usuario: UsuarioEntity) {
    Object.assign(this, usuario);
  }
}
