import { z } from "zod";
import { historicoSchema } from "../schemas/historico-schema";

export type HistoricoEntity = z.infer<typeof historicoSchema> & {
  id: string;
  criado_em: Date;
  atualizado_em: Date;
};
