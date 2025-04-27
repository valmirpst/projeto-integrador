export class LivroEntity {
  public isbn: string;

  constructor(livro: LivroEntity) {
    this.isbn = livro.isbn;
  }
}
