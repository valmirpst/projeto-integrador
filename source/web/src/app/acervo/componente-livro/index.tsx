import styles from "./componente.livro.module.css";
import { Star } from "phosphor-react";
import Image from "next/image";
import { BookType } from "@/@types/book";
import { Box } from "@/components/ui/box";

interface Props {
  book: BookType;
}

export default function Livros({ book }: Props) {
  const { titulo, caminho_img, total_avaliacoes } = book;

  return (
    <Box>
      <Image
        src={caminho_img}
        alt={titulo}
        width={160}
        height={240}
        className={styles.img}
      />
      <Box className={styles.titulo}>{titulo}</Box>
      <Box className={styles.avaliacaoContainer}>
        <Box className={styles.avaliacoes}>{total_avaliacoes}</Box>
        <Box>
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
        </Box>
      </Box>
    </Box>
  );
}
