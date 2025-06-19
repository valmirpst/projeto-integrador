import { z } from "zod";

const categoriaSchema = z.object({
  nome: z.string(),
  tipo: z.enum(["subcategoria", "categoria"]),
});

export type Categoria = z.infer<typeof categoriaSchema>;

export const livroSchema = z.object({
  isbn: z.string({ message: "O campo 'isbn' é requerido mas não foi informado." }),
  titulo: z.string({ message: "O campo 'titulo' é requerido mas não foi informado." }),
  edicao: z.string({ message: "O campo 'edicao' é requerido mas não foi informado." }),
  editora: z.string({ message: "O campo 'editora' é requerido mas não foi informado." }),
  qtd_disponivel: z.number({ message: "O campo 'qtd_disponivel' é requerido mas não foi informado." }),
  genero: z.string({ message: "O campo 'genero' é requerido mas não foi informado." }),
  caminho_img: z.string().nullable().optional(),
  descricao: z.string({ message: "O campo 'descricao' é requerido mas não foi informado." }),
  total_avaliacoes: z.number().default(0).optional(),
  total_estrelas: z.number().default(0).optional(),
  autores: z.array(z.string(), { message: "O campo 'autores' é requerido mas não foi informado." }),
  categorias: z.array(categoriaSchema, { message: "O campo 'categorias' é requerido mas não foi informado." }),
  status: z.enum(["ativo", "inativo"]).optional(),
});
