"use client";
import { BookType } from "@/@types/book";
import Carousel from "@/components/carousel";
import Search from "@/components/search";
import { Box } from "@/components/ui/box";
import { theme } from "@/theme";
import { useState } from "react";
import styles from "./page.module.css";

type HomeClientProps = {
  books: BookType[];
};

export default function HomeClient({ books }: HomeClientProps) {
  const [searchValue, setSearchValue] = useState("");
  // const [userResponse, setUserResponse] = useState<UserType>(null);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const userResponse = await api.usuarios.getByIdAsync("u10", {
  //       options: {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     });

  //     setUserResponse(awuserResponse);
  //   }
  // }, []);

  return (
    <Box className={styles.homeWrapper}>
      <Search
        className={styles.searchHome}
        value={searchValue}
        setState={setSearchValue}
      />

      {books.length === 0 ? (
        <p className={styles.noBooksMessage}>Nenhum livro cadastrado.</p>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}
