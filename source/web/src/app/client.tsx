"use client";
import Search from "@/components/search";
import { Box } from "@/components/ui/box";
import styles from "./page.module.css";
import { useState } from "react";
import Carousel from "@/components/carousel";
import { theme } from "@/theme";
import { books } from "@/mock/book";

export default function HomeClient() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box className={styles.homeWrapper}>
      <Search
        className={styles.searchHome}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
        }}
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
          scrollbarColor={theme.colors.gray300 + "88"}
        />
      </Box>
    </Box>
  );
}
