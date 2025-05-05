export type ReserveType = {
  id_usuario: string;
  isbn_livro: string;
  id_bibliotecario: string;
  criado_em: Date;
  atualizado_em: Date;
  status: "ativo" | "inativo";
  favorito: boolean;
};
