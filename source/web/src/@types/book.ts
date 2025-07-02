import { CategoryType } from "./category";

export type BookType = {
  isbn: string;
  titulo: string;
  edicao: string;
  editora: string;
  qtd_disponivel: number;
  genero: string;
  descricao: string;
  total_avaliacoes: number;
  total_estrelas: number;
  autores: string[];
  categorias: CategoryType[];
  caminho_img?: string;
};
