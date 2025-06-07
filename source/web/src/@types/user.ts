type Perfil = "bibliotecario" | "aluno" | "professor";

export type UserType = {
  id: string;
  ra?: string | null;
  siape?: string | null;
  nome: string;
  sobrenome: string;
  data_nasc: string;
  email: string;
  telefone: string;
  perfil: Perfil;
};
