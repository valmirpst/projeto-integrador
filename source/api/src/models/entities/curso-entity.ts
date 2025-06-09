import { z } from "zod";
import { cursoSchema } from "../schemas/curso-schema";

export type CursoEntity = z.infer<typeof cursoSchema>;
