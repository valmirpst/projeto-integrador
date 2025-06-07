import { z } from "zod";

export const historicoSchema = z.object({
  id: z.string().optional(),
  isbn_livro: z.string(),
  id_usuario: z.string(),
  id_bibliotecario: z.string(),
  criado_em: z.coerce.date().optional(),
  atualizado_em: z.coerce.date().optional(),
  status: z.enum(["ativo", "inativo"]),
});
