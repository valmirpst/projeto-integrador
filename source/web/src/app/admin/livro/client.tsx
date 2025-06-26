"use client";
import { Box } from "@/components/ui/box";
import styles from "./livro.module.css";
import stylesAdmin from "../admin.module.css";
import Table, { ColumnType } from "@/components/table";
import { BookType } from "@/@types/book";
import { Text } from "@/components/ui/text";
import Search from "@/components/search";
import { useEffect, useState } from "react";
import Select from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RegisterLivroModal, {
  PropsRegisterLivroModalType,
} from "@/components/register-livro-modal";
import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";

export default function LivroClient() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCreateBookModalActive, setIsCreateBookModalActive] = useState(false);
  const [livroEditProps, setLivroEditProps] = useState<
    Partial<PropsRegisterLivroModalType>
  >({});
  const [categoriasFilter, setCategoriasFilter] = useState<string[]>([]);
  const [autoresFilter, setAutoresFilter] = useState<string[]>([]);

  const loadBooks = async () => {
    const res = await api.livros.getAsync(getTokenHeader());

    // @ts-expect-error teste
    if (res.data) setBooks(res.data.data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const columns: ColumnType<BookType> = {
    titulo: {
      title: "Livro",
      proporcion: 2.5,
      image: "caminho_img",
    },
    autores: {
      title: "Autor(es)",
      proporcion: 2,
    },
    editora: {
      title: "Editora",
      proporcion: 1.5,
    },
    edicao: {
      title: "Edição",
      proporcion: 2,
      justify: "center",
    },
    genero: {
      title: "Gênero",
      proporcion: 1.5,
    },
    qtd_disponivel: {
      title: "Disponível",
      proporcion: 1,
    },
  };

  function onOpenChange() {
    loadBooks();
    setIsCreateBookModalActive(false);
    setLivroEditProps({});
  }

  async function handleTrash(book: BookType) {
    await api.livros.deleteAsync(book.isbn, getTokenHeader());
    await loadBooks();
  }

  function handleEdit(book: BookType) {
    setLivroEditProps({
      open: true,
      onOpenChange: onOpenChange,
      formdata: book,
      update: true,
    });
  }

  const autores = [
    ...new Set(
      books.reduce((acc, value) => {
        return [...acc, ...value.autores];
      }, [] as string[])
    ),
  ];

  const filteredBooks = books.filter((value) => {
    if (
      (autoresFilter.length === 0 ||
        value.autores.some((autor) => autoresFilter.includes(autor))) &&
      (categoriasFilter.length === 0 ||
        value.categorias
          .map((value) => value.nome)
          .some((categoria) => categoriasFilter.includes(categoria))) &&
      value.titulo.toLowerCase().startsWith(searchValue.toLowerCase())
    ) {
      return true;
    }
  });

  const categorias = [
    ...new Set(
      books.reduce((acc, value) => {
        return [...acc, ...value.categorias.map((value) => value.nome)];
      }, [] as string[])
    ),
  ];

  if (!books) {
    return <Text>Erro ao carregar os livros.</Text>;
  }

  return (
    <>
      <Box className={styles.adminBookWrapper}>
        <Text as="h1" className={stylesAdmin.adminTitle}>
          Livros
        </Text>
        <Box className={stylesAdmin.adminFilterContainer}>
          <Box className={stylesAdmin.adminFilters}>
            <Search
              className={stylesAdmin.adminSearch}
              value={searchValue}
              setState={setSearchValue}
              width={500}
            />
            <Box className={stylesAdmin.adminSelectContainer}>
              <Select
                options={categorias}
                label="Categoria"
                width={200}
                activeValues={categoriasFilter}
                handleChange={(values) => setCategoriasFilter(values)}
              />
              <Select
                options={autores}
                label="Autores"
                width={200}
                activeValues={autoresFilter}
                handleChange={(values) => setAutoresFilter(values)}
              />
            </Box>
            <Button
              className={stylesAdmin.adminButton}
              size="sm"
              width={120}
              onClick={() => setIsCreateBookModalActive(true)}
            >
              Cadastrar
            </Button>
          </Box>
          <Box className={stylesAdmin.adminOtherInformations}>
            <Text color="gray400">{books.length} produtos encontrados</Text>
            <Box className={stylesAdmin.adminCleanFilters}>
              <Text color="primary300" weight="bold">
                Limpar filtros
              </Text>
              <Text>Filtros selecionados</Text>
            </Box>
          </Box>
        </Box>
        <Table
          items={filteredBooks}
          columns={columns}
          handleTrash={handleTrash}
          handleEdit={handleEdit}
          type="book"
        />
      </Box>
      <RegisterLivroModal
        open={isCreateBookModalActive}
        onOpenChange={onOpenChange}
        {...livroEditProps}
      />
    </>
  );
}
