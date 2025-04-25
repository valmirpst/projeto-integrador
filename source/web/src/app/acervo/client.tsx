'use client';

import styles from './acervo.module.css';
import { books } from '@/mock/book';
import Livros from './componente-livro';

export default function AcervoClient() {
  return (
    <div className={styles.container}>
      {books.map((book) => (
        <Livros key={book.isbn} book={book} />
      ))}
    </div>
  );
}
