import { z } from "zod";

export const authSchema = z.object(
  {
    email: z.string({ message: "Um email é obrigatório" }).min(1, "Um email é obrigatório"),
    senha: z.string({ message: "Uma senha é obrigatória" }).min(1, "Uma senha é obrigatória"),
  },
  {
    message: "Email e senha são obrigatórios",
  }
);

export type AuthSchema = z.infer<typeof authSchema>;
