export type Book = {
  isbn: string;
  titulo: string;
  edicao: string;
  editora: string;
  qtd_disponivel: number;
  genero: "M" | "F";
  caminho_img: string;
  descricao: string;
  total_avaliacoes: number;
  total_estrelas: string;
};
