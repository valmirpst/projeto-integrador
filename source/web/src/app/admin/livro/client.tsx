"use client";
import { Box } from "@/components/ui/box";
import styles from "./livro.module.css";
import { books } from "@/mock/book";
import Table, { ColumnType } from "@/components/table";
import { Book } from "@/@types/book";

export default function HomeClient() {
  const columns: ColumnType<Book & { autor: string }> = {
    titulo: {
      title: "Livro",
      proporcion: 2.5,
      image: "caminho_img",
    },
    autor: {
      title: "Autor",
      proporcion: 2,
    },
    editora: {
      title: "Editora",
      proporcion: 1.5,
    },
    edicao: {
      title: "Edição",
      proporcion: 2,
      justify: "center",
    },
    genero: {
      title: "Gênero",
      proporcion: 1.5,
    },
    qtd_disponivel: {
      title: "Disponível",
      proporcion: 1,
      justify: "center",
    },
  };

  return (
    <Box className={styles.adminBookWrapper}>
      <Table items={books} columns={columns}></Table>
    </Box>
  );
}
