"use client";
import { BookType } from "@/@types/book";
import Carousel from "@/components/carousel";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import Img from "@/components/ui/img";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { books } from "@/mock/book";
import { theme } from "@/theme";
import { Heart, ShareNetwork, Star } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./livro.module.css";

type PropsType = {
  isbn: string;
};

export default function LivroClient({ isbn }: PropsType) {
  const [book, setBook] = useState<BookType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const bookResponse = await api.livros.getByIdAsync(isbn, getTokenHeader()!);

        if (!bookResponse.ok) {
          setError("Erro ao buscar livro.");
          return;
        }
        if (!bookResponse.data) {
          setError("Livro não encontrado.");
          return;
        }

        setBook(bookResponse.data);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [isbn]);

  if (loading) {
    return (
      <Box className={styles.loading}>
        <Text>Carregando...</Text>
      </Box>
    );
  }

  if (error || !book) {
    return (
      <Box>
        <Text>{error || "Livro não encontrado."}</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <div className={styles.livroDetalhes}>
        <Img className={styles.imgLivro} src="/mock/livro-crepusculo.jpg" alt="" width={272} height={400} />

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
                  <Heart size={32} className={styles.iconeFavorito} style={{ color: theme.colors.danger700 }} />
                  <ShareNetwork className={styles.iconeCompartilhar} size={32} />
                </Box>
              </Box>
            </Box>

            <Button className={styles.botaoEnviar} style={{ backgroundColor: theme.colors.primary500 }} size="sm">
              Enviar
            </Button>
          </Box>

          <Text className={styles.descricao} style={{ color: theme.colors.gray700 }}>
            {book.descricao}
          </Text>
        </div>
      </div>

      <Carousel books={books} title="Títulos Semelhantes" />
    </Box>
  );
}
