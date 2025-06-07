import { z } from "zod";

export const cursoSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, "O nome do curso deve ter pelo menos 3 caracteres"),
});
