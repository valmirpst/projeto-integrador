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
  total_avaliacoes: z.number().default(0),
  total_estrelas: z.number().default(0),
  autores: z.array(z.string()),
});
