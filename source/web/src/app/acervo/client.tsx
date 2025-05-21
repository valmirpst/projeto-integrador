"use client";

import styles from "./acervo.module.css";
import { books } from "@/mock/book";
import Livros from "./componente-livro";
import { Box } from "@/components/ui/box";
import Search from "@/components/search";
import { useState } from "react";
import Select from "@/components/ui/select";
import { Text } from "@/components/ui/text";

export default function AcervoClient() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box className={styles.container}>
      <Box className={styles.filterContainer}>
        <Box className={styles.acervoFilters}>
          <Search
            className={styles.acervoSearch}
            value={searchValue}
            setState={setSearchValue}
            width={500}
          />
          <Box className={styles.selectContainer}>
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
        </Box>
        <Box className={styles.otherInformations}>
          <Text color="gray400">{books.length} produtos encontrados</Text>
          <Box className={styles.cleanFilters}>
            <Text color="primary300" weight="bold">
              Limpar filtros
            </Text>
            <Text>Filtros selecionados</Text>
          </Box>
        </Box>
      </Box>
      <Box className={styles.acervoList}>
        {books.map((book) => (
          <Livros key={book.isbn} book={book} />
        ))}
      </Box>
    </Box>
  );
}
