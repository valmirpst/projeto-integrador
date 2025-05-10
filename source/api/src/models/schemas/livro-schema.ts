import { z } from "zod";

export const livroSchema = z.object({
  isbn: z.string(),
  titulo: z.string(),
  edicao: z.string(),
  editora: z.string(),
  qtd_disponivel: z.number(),
  genero: z.string(),
  caminho_img: z.string().optional(),
  descricao: z.string(),
});
