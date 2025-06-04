"use client";
import { Box } from "@/components/ui/box";
import styles from "./livro.module.css";
import stylesAdmin from "../admin.module.css";
import { books } from "@/mock/book";
import Table, { ColumnType } from "@/components/table";
import { BookType } from "@/@types/book";
import { Text } from "@/components/ui/text";
import Search from "@/components/search";
import { useState } from "react";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RegisterLivroModal from "@/components/register-livro-modal";

export default function LivroClient() {
  const [searchValue, setSearchValue] = useState("");
  const [isCreateBookModalActive, setIsCreateBookModalActive] = useState(false);

  const columns: ColumnType<BookType> = {
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
    <>
      <Box className={styles.adminBookWrapper}>
        <Text as="h1" className={stylesAdmin.adminTitle}>
          Livros
        </Text>
        <Box className={stylesAdmin.adminFilterContainer}>
          <Box className={stylesAdmin.adminFilters}>
            <Search
              className={stylesAdmin.adminSearch}
              value={searchValue}
              setState={setSearchValue}
              width={500}
            />
            <Box className={stylesAdmin.adminSelectContainer}>
              <Select
                options={books.map((value) => value.genero)}
                label="Gênero"
                width={200}
              />
              <Select
                options={books.map((value) => value.editora)}
                label="Editora"
                width={200}
              />
            </Box>
            <Button
              className={stylesAdmin.adminButton}
              size="sm"
              width={120}
              onClick={() => setIsCreateBookModalActive(true)}
            >
              Cadastrar
            </Button>
          </Box>
          <Box className={stylesAdmin.adminOtherInformations}>
            <Text color="gray400">{books.length} produtos encontrados</Text>
            <Box className={stylesAdmin.adminCleanFilters}>
              <Text color="primary300" weight="bold">
                Limpar filtros
              </Text>
              <Text>Filtros selecionados</Text>
            </Box>
          </Box>
        </Box>
        <Table items={books} columns={columns}></Table>
      </Box>
      <RegisterLivroModal
        open={isCreateBookModalActive}
        onOpenChange={() => setIsCreateBookModalActive(false)}
      />
    </>
  );
}
