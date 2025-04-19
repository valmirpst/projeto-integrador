"use client";
import Search from "@/components/search";
import { Box } from "@/components/ui/box";
import styles from "./page.module.css";
import { useState } from "react";
import Carousel from "@/components/carousel";
import { Book } from "@/@types/boook";

const books: Book[] = [
  {
    isbn: "978-3-16-148410-0",
    titulo: "O Senhor dos Anéis",
    edicao: "2ª",
    editora: "HarperCollins",
    qtd_disponivel: 12,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao: "Uma épica aventura pela Terra Média para destruir o Um Anel.",
    total_avaliacoes: 250,
    total_estrelas: "1125",
  },
  {
    isbn: "978-0-06-112008-4",
    titulo: "Orgulho e Preconceito",
    edicao: "1ª",
    editora: "Penguin Books",
    qtd_disponivel: 5,
    genero: "F",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Romance clássico de Jane Austen que explora temas de amor e classe social.",
    total_avaliacoes: 320,
    total_estrelas: "1440",
  },
  {
    isbn: "978-85-250-4560-4",
    titulo: "Capitães da Areia",
    edicao: "3ª",
    editora: "Companhia das Letras",
    qtd_disponivel: 8,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Narrativa sobre um grupo de meninos de rua em Salvador, escrita por Jorge Amado.",
    total_avaliacoes: 180,
    total_estrelas: "810",
  },
  {
    isbn: "978-85-250-4560-3",
    titulo: "Capitães da Areia",
    edicao: "3ª",
    editora: "Companhia das Letras",
    qtd_disponivel: 8,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Narrativa sobre um grupo de meninos de rua em Salvador, escrita por Jorge Amado.",
    total_avaliacoes: 180,
    total_estrelas: "810",
  },
  {
    isbn: "978-85-250-4560-2",
    titulo: "Capitães da Areia",
    edicao: "3ª",
    editora: "Companhia das Letras",
    qtd_disponivel: 8,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Narrativa sobre um grupo de meninos de rua em Salvador, escrita por Jorge Amado.",
    total_avaliacoes: 180,
    total_estrelas: "810",
  },
  {
    isbn: "978-85-250-4530-2",
    titulo: "Capitães da Areia",
    edicao: "3ª",
    editora: "Companhia das Letras",
    qtd_disponivel: 8,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Narrativa sobre um grupo de meninos de rua em Salvador, escrita por Jorge Amado.",
    total_avaliacoes: 180,
    total_estrelas: "810",
  },
  {
    isbn: "978-45-250-4560-2",
    titulo: "Capitães da Areia",
    edicao: "3ª",
    editora: "Companhia das Letras",
    qtd_disponivel: 8,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Narrativa sobre um grupo de meninos de rua em Salvador, escrita por Jorge Amado.",
    total_avaliacoes: 180,
    total_estrelas: "810",
  },
  {
    isbn: "978-85-750-4560-2",
    titulo: "Capitães da Areia",
    edicao: "3ª",
    editora: "Companhia das Letras",
    qtd_disponivel: 8,
    genero: "M",
    caminho_img: "/mock/livro-crepusculo.jpg",
    descricao:
      "Narrativa sobre um grupo de meninos de rua em Salvador, escrita por Jorge Amado.",
    total_avaliacoes: 180,
    total_estrelas: "810",
  },
];

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box className={styles.homeWrapper}>
      <Search
        className={styles.seachHome}
        onChange={(event) => console.log(event)}
        value={searchValue}
      />
      <Carousel
        className={styles.carouselHeadSuggestions}
        title="Sugestões de Leitura"
        books={books}
      />
      <Box className={styles.carouselContinueReadingWrapper}>
        <Carousel
          className={styles.carouselContinueReading}
          title="Continue Lendo"
          books={books}
        />
      </Box>
    </Box>
  );
}
