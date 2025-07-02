type Perfil = "bibliotecario" | "aluno" | "professor";

export type UserType = {
  id: string;
  ra?: string;
  ciape?: string;
  nome: string;
  sobrenome: string;
  data_nasc: string;
  email: string;
  telefone: string;
  perfil: Perfil;
  senha: string;
  id_cursos: string[];
  siape: string;
};
