import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.string(),
  ra: z.string().optional().nullable(),
  siape: z.string().optional().nullable(),
  nome: z.string({ message: "O campo 'nome' é requerido mas não foi informado." }),
  sobrenome: z.string({ message: "O campo 'sobrenome' é requerido mas não foi informado." }),
  data_nasc: z.string({ message: "O campo 'data_nasc' é requerido mas não foi informado." }),
  email: z.string({ message: "O campo 'email' é requerido mas não foi informado." }),
  telefone: z.string({ message: "O campo 'telefone' é requerido mas não foi informado." }),
  perfil: z.enum(["bibliotecario", "aluno", "professor"], {
    message: "O campo 'perfil' é requerido mas não foi informado.",
  }),
  id_cursos: z.array(z.string().optional().nullable()),
  status: z.enum(["ativo", "inativo"]).optional(),
});
