import { z } from "zod";

export const usuarioSchema = z.object({
  id: z.string(),
  ra: z.string().optional().nullable(),
  siape: z.string().optional().nullable(),
  nome: z.string(),
  sobrenome: z.string(),
  data_nasc: z.string(),
  email: z.string(),
  telefone: z.string(),
  perfil: z.enum(["bibliotecario", "aluno", "professor", "0", "1", "2"]),
});
