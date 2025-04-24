"use client";
import { Box } from "@/components/ui/box";
import styles from "./livro.module.css";
import { books } from "@/mock/book";
import Table, { ColumnType } from "@/components/table";
import { Book } from "@/@types/book";

export default function HomeClient() {
  const columns: ColumnType<Book> = {
    titulo: {
      title: "livro",
      proporcion: 2.5,
      image: "caminho_img",
    },
    isbn: {
      title: "Autor",
      proporcion: 2,
    },
    editora: {
      title: "Editora",
      proporcion: 2,
    },
    edicao: {
      title: "Edição",
      proporcion: 1,
    },
    genero: {
      title: "Gênero",
      proporcion: 1.25,
    },
    qtd_disponivel: {
      title: "Disponível",
      proporcion: 1,
    },
  };

  return (
    <Box className={styles.adminBookWrapper}>
      <Table items={books} columns={columns}></Table>
    </Box>
  );
}
