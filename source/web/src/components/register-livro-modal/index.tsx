"use client";

import { BookType } from "@/@types/book";
import { Dialog } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import Img from "../ui/img";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import styles from "./register-livro-modal.module.css";

export type PropsRegisterLivroModalType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formdata?: BookType;
  update?: boolean;
};

export default function RegisterLivroModal({ open, onOpenChange, formdata, update }: PropsRegisterLivroModalType) {
  const [form, setForm] = useState<BookType>({
    isbn: "",
    titulo: "",
    edicao: "",
    genero: "",
    editora: "",
    descricao: "",
    qtd_disponivel: 1,
    autores: [] as string[],
    total_avaliacoes: 0,
    total_estrelas: 0,
    categorias: [],
    caminho_img: "",
  });

  const [autor, setAutor] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [subCategoria, setSubCategoria] = useState<string>("");
  const [formdataImg, setFormdataImg] = useState<FormData | null>(null);

  useEffect(() => {
    if (formdata) {
      const fomatedFormdata = {
        ...formdata,
        caminho_img: "http://localhost:3333/images/" + formdata.caminho_img,
      };
      setForm(fomatedFormdata);
    }
    return () => {
      setForm({
        isbn: "",
        titulo: "",
        edicao: "",
        genero: "",
        editora: "",
        descricao: "",
        qtd_disponivel: 1,
        autores: [] as string[],
        total_avaliacoes: 0,
        total_estrelas: 0,
        categorias: [],
        caminho_img: "",
      });
      setAutor("");
      setFormdataImg(null);
    };
  }, [formdata]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formDataImg = new FormData();
      formDataImg.append("book_cover", file);
      setFormdataImg(formDataImg);

      setForm(prev => ({
        ...prev,
        caminho_img: URL.createObjectURL(e.target.files![0]),
      }));
    }
  };

  const handleSubmitChange = async () => {
    const isValid = Object.values(form).every(value => value !== "" && value !== null);

    if (isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { caminho_img, ...formWithoutImg } = form;
      if (update) {
        await api.livros.putAsync(form.isbn, {
          payload: formWithoutImg,
          ...getTokenHeader(),
        });
      } else {
        await api.livros.postAsync({
          payload: formWithoutImg,
          ...getTokenHeader(),
        });
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

      await fetch(`http://localhost:3333/api/livros/${formWithoutImg.isbn}/upload`, {
        method: "POST",
        headers: myHeaders,
        body: formdataImg,
      });
      setForm({
        isbn: "",
        titulo: "",
        edicao: "",
        genero: "",
        editora: "",
        descricao: "",
        qtd_disponivel: 1,
        autores: [] as string[],
        total_avaliacoes: 0,
        total_estrelas: 0,
        categorias: [],
        caminho_img: "",
      });
      setFormdataImg(null);
      onOpenChange(false);
    }
  };

  function handleAutor(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    e.target.blur();
    setForm(prev => ({ ...form, autores: [...prev.autores, value] }));
    setAutor("");
  }

  function handleCategoria(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    e.target.blur();
    setForm(prev => ({
      ...form,
      categorias: [...prev.categorias, { nome: value, tipo: "categoria" }],
    }));
    setCategoria("");
  }

  function handleSubCategoria(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    e.target.blur();
    setForm(prev => ({
      ...form,
      categorias: [...prev.categorias, { nome: value, tipo: "subcategoria" }],
    }));
    setSubCategoria("");
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={800} className={styles.modalContainer}>
        <Box className={styles.modalContent}>
          <Box className={styles.modalInputs}>
            <Dialog.Title className={styles.modalTitle}>Registrar Livro</Dialog.Title>
            <Dialog.Close />
            <Box className={styles.row}>
              <Input id="isbn" label="ISBN" value={form.isbn} onChange={e => handleChange(e, "isbn")} />
              <Input id="titulo" label="Título" value={form.titulo} onChange={e => handleChange(e, "titulo")} />
            </Box>
            <Box className={styles.row}>
              <Input id="edicao" label="Edição" value={form.edicao} onChange={e => handleChange(e, "edicao")} />
              <Input id="genero" label="Gênero" value={form.genero} onChange={e => handleChange(e, "genero")} />
            </Box>
            <Input id="editora" label="Editora" value={form.editora} onChange={e => handleChange(e, "editora")} />
            <Box>
              <Box style={{ marginBottom: "1rem" }}>
                <Input id="autores" label="Autores" onBlur={handleAutor} value={autor} onChange={e => setAutor(e.target.value)} />
                <Text>{form.autores.join(" - ")}</Text>
              </Box>
              <Box style={{ marginBottom: "1rem" }}>
                <Input
                  id="categorias"
                  label="Categorias"
                  onBlur={handleCategoria}
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                />
                <Text>
                  {form.categorias
                    .filter(value => value.tipo === "categoria")
                    .map(value => value.nome)
                    .join(" - ")}
                </Text>
              </Box>
              <Box style={{ marginBottom: "1rem" }}>
                <Input
                  id="sub-categorias"
                  label="Sub-categorias"
                  onBlur={handleSubCategoria}
                  value={subCategoria}
                  onChange={e => setSubCategoria(e.target.value)}
                />
                <Text>
                  {form.categorias
                    .filter(value => value.tipo === "subcategoria")
                    .map(value => value.nome)
                    .join(" - ")}
                </Text>
              </Box>
            </Box>
            <Box>
              <label htmlFor="descricao" className={styles.label}>
                Descrição
              </label>
              <textarea
                id="descricao"
                className={styles.textarea}
                value={form.descricao}
                onChange={e => handleChange(e, "descricao")}
              />
            </Box>
            <Box className={styles.footer}>
              <label htmlFor="quantidade" className={styles.label}>
                Quantidade
              </label>
              <input
                id="quantidade"
                type="number"
                min={1}
                className={styles.inputSmall}
                value={form.qtd_disponivel}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    qtd_disponivel: parseInt(e.target.value),
                  }))
                }
              />
            </Box>
          </Box>
          <Box className={styles.modalImageContainer}>
            <Img
              className={styles.modalImage}
              src={form.caminho_img || "/image-example.svg"}
              alt="Pré-visualização da imagem"
              width={220}
              height={300}
            />
            <input id="img" type="file" accept="image/*" onChange={handleImageChange} />
          </Box>
        </Box>

        <Dialog.Actions className={styles.actions}>
          <Dialog.Close asChild>
            <Button variant="tertiary">Cancelar</Button>
          </Dialog.Close>
          <Button onClick={handleSubmitChange}>{update ? "Atualizar livro" : "Adicionar livro"}</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  );
}
