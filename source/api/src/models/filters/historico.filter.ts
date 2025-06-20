export class HistoricoFilter {
  isbn_livro?: string;
  id_usuario?: string;
  id_bibliotecario?: string;
  status?: "ativo" | "inativo";

  constructor(isbn_livro?: string, id_usuario?: string, id_bibliotecario?: string, status?: "ativo" | "inativo") {
    this.isbn_livro = isbn_livro;
    this.id_usuario = id_usuario;
    this.id_bibliotecario = id_bibliotecario;
    this.status = status;
  }
}
