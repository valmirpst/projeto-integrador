import styles from './acervo.module.css';
import { Star } from 'phosphor-react';
import Image from 'next/image';
import { Book } from '@/@types/boook';

interface Props {
  book: Book;
}

export default function Livros({ book }: Props) {
  const { titulo, caminho_img, total_avaliacoes } = book;

  return (
    <div >
      <Image
        src={caminho_img}
        alt={titulo}
        width={160}
        height={240}
        className={styles.img}
      />
      <div className={styles.titulo}>{titulo}</div>
      <div className={styles.avaliacaoContainer}>
      <div className={styles.avaliacoes}>{total_avaliacoes}</div>
        <div>
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
          <Star size={12} className={styles.iconeEstrela} />
        </div>
       
      </div>
    </div>
  );
}
