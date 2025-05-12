"use client";
import { Book } from "@/@types/boook";
import Carousel from "@/components/carousel";
import Search from "@/components/search";
import { Box } from "@/components/ui/box";
import { theme } from "@/theme";
import { useState } from "react";
import styles from "./page.module.css";

type HomeClientProps = {
  books: Book[];
};

export default function HomeClient({ books }: HomeClientProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box className={styles.homeWrapper}>
      <Search className={styles.seachHome} onChange={event => console.log(event)} value={searchValue} />
      {books.length === 0 ? (
        <p className={styles.noBooksMessage}>Nenhum livro cadastrado.</p>
      ) : (
        <>
          <Carousel className={styles.carouselHeadSuggestions} title="Sugestões de Leitura" books={books} />
          <Box className={styles.carouselContinueReadingWrapper}>
            <Carousel
              className={styles.carouselContinueReading}
              title="Continue Lendo"
              books={books}
              scrollbarColor={theme.colors.gray300 + "88"}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
