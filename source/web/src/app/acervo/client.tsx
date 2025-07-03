"use client";

import { BookType } from "@/@types/book";
import Search from "@/components/search";
import { Box } from "@/components/ui/box";
import Select from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { getTokenHeader, parseJwt } from "@/lib/getTokenHeader";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./acervo.module.css";
import Livros from "./componente-livro";

export default function AcervoClient() {
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("aaa");
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { ok, data, message, status } = await api.livros.getAsync(getTokenHeader()!);
      console.log("aaa", data);
      if (!ok || !data) {
        setError(status === 401 ? "Não autorizado" : message || "Erro ao buscar livros.");
        setLoading(false);
        return;
      }
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userToken = getTokenHeader()?.options.headers.Authorization.split(" ")[1];
        if (!userToken) return;

        const parsedToken = parseJwt(userToken);
        const userResponse = await api.usuarios.getByIdAsync(parsedToken?.payload.id || "", getTokenHeader() || {});

        if (userResponse.ok && userResponse.data?.perfil === "bibliotecario") {
          router.push("/admin/dashboard");
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <Box className={styles.loading}>
        <Loader2 size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles.error}>
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.filterContainer}>
        <Box className={styles.acervoFilters}>
          <Search className={styles.acervoSearch} value={searchValue} setState={setSearchValue} width={500} />
          <Box className={styles.selectContainer}>
            <Select
              options={books.map(value => value.genero)}
              label="Gênero"
              width={200}
              activeValues={[]}
              handleChange={values => alert(values)}
            />
            <Select
              options={books.map(value => value.editora)}
              label="Editora"
              width={200}
              activeValues={[]}
              handleChange={values => alert(values)}
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
        {books.map(book => (
          <Livros key={book.isbn} book={book} />
        ))}
      </Box>
    </Box>
  );
}
