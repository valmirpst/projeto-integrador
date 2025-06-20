import { z } from "zod";
import { livroSchema } from "../schemas/livro.schema";

export type LivroEntity = z.infer<typeof livroSchema>;
