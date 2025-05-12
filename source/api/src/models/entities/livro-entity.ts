export class LivroEntity {
  public isbn!: string;
  public titulo!: string;
  public edicao!: string;
  public editora!: string;
  public qtd_disponivel!: number;
  public genero!: string;
  public caminho_img?: string;
  public descricao!: string;
  public total_avaliacoes: number = 0;
  public total_estrelas: number = 0;

  constructor(livro: LivroEntity) {
    Object.assign(this, livro);
  }
}
