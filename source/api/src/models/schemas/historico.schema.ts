import { z } from "zod";

export const historicoSchema = z.object({
  isbn_livro: z.string({ message: "O campo 'isbn_livro' é requerido mas não foi informado." }),
  id_usuario: z.string({ message: "O campo 'id_usuario' é requerido mas não foi informado." }),
  id_bibliotecario: z.string({ message: "O campo 'id_bibliotecario' é requerido mas não foi informado." }),
  status: z.enum(["ativo", "inativo"]).optional(),
});

export type HistoricoSchema = z.infer<typeof historicoSchema>;
