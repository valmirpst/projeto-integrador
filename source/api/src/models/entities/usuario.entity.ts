import { z } from "zod";
import { usuarioSchema } from "../schemas/usuario.schema";

export type UsuarioEntity = z.infer<typeof usuarioSchema>;
