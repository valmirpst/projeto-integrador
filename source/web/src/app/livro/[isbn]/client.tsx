"use client";
import { Box } from "@/components/ui/box";
import styles from "./livro.module.css";
import { Text } from "@/components/ui/text";
import Carousel from "@/components/carousel";
import { books } from "@/mock/book";
import Img from "@/components/ui/img";
import { Button } from "@/components/ui/button";
import { Heart, ShareNetwork, Star } from "phosphor-react";
import { theme } from "@/theme";
import { BookType } from "@/@types/book";

type PropsType = {
  book: BookType;
};

export default function LivroClient({ book }: PropsType) {
  return (
    <Box className={styles.container}>
      <div className={styles.livroDetalhes}>
        <Img
          className={styles.imgLivro}
          src="/mock/livro-crepusculo.jpg"
          alt=""
          width={272}
          height={400}
        />

        <div className={styles.conteudo}>
          <Box className={styles.livroHeader}>
            <Box>
              <Text className={styles.titulo}>{book.titulo}</Text>
              <Box className={styles.bookOptions}>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>
                <Star size={32} className={styles.iconeEstrela}></Star>

                <Box>
                  <Heart
                    size={32}
                    className={styles.iconeFavorito}
                    style={{ color: theme.colors.danger700 }}
                  />
                  <ShareNetwork
                    className={styles.iconeCompartilhar}
                    size={32}
                  />
                </Box>
              </Box>
            </Box>

            <Button
              className={styles.botaoEnviar}
              style={{ backgroundColor: theme.colors.primary500 }}
              size="sm"
            >
              Enviar
            </Button>
          </Box>

          <Text
            className={styles.descricao}
            style={{ color: theme.colors.gray700 }}
          >
            {book.descricao}
          </Text>
        </div>
      </div>

      <Carousel books={books} title="Títulos Semelhantes" />
    </Box>
  );
}
