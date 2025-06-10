"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { Box } from "../ui/box";
import styles from "./register-livro-modal.module.css";
import { Button } from "../ui/button";
import Img from "../ui/img";
import { api } from "@/lib/api";
import { BookType } from "@/@types/book";

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formdata?: BookType;
  update?: boolean;
};

export default function RegisterLivroModal({
  open,
  onOpenChange,
  formdata,
}: PropsType) {
  const [form, setForm] = useState<BookType>(
    formdata || {
      isbn: "oiii4",
      titulo: "",
      edicao: "",
      genero: "",
      editora: "",
      descricao: "",
      qtd_disponivel: 1,
      autores: [] as string[],
      caminho_img: "",
      total_avaliacoes: 0,
      total_estrelas: 0,
      categorias: [{ nome: "eu estou testendo", tipo: "categoria" }],
    }
  );
  const [autor, setAutor] = useState<string>("");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    const file = "testeeeeFileee";
    if (file) {
      setForm((prev) => ({ ...prev, caminho_img: file }));
      setPreviewUrl(URL.createObjectURL(e.target.files![0]));
    }
  };

  const handleSubmitChange = async () => {
    const isValid = Object.values(form).every(
      (value) => value !== "" && value !== null
    );

    if (isValid) {
      await api.livros.postAsync({ payload: form });
      setForm({
        isbn: "",
        titulo: "",
        edicao: "",
        genero: "",
        editora: "",
        descricao: "",
        qtd_disponivel: 1,
        autores: [] as string[],
        caminho_img: "",
        total_avaliacoes: 0,
        total_estrelas: 0,
        categorias: [{ nome: "eu estou testendo", tipo: "categoria" }],
      });
      setPreviewUrl(null);
      onOpenChange(false);
    }
  };

  function handleAutor(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    e.target.blur();
    setForm((prev) => ({ ...form, autores: [...prev.autores, value] }));
    setAutor("");
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={800} className={styles.modalContainer}>
        <Box className={styles.modalContent}>
          <Box className={styles.modalInputs}>
            <Dialog.Title className={styles.modalTitle}>
              Registrar Livro
            </Dialog.Title>
            <Dialog.Close />
            <Input
              id="titulo"
              label="Título"
              value={form.titulo}
              onChange={(e) => handleChange(e, "titulo")}
            />
            <Box className={styles.row}>
              <Input
                id="edicao"
                label="Edição"
                value={form.edicao}
                onChange={(e) => handleChange(e, "edicao")}
              />
              <Input
                id="genero"
                label="Gênero"
                value={form.genero}
                onChange={(e) => handleChange(e, "genero")}
              />
            </Box>
            <Input
              id="editora"
              label="Editora"
              value={form.editora}
              onChange={(e) => handleChange(e, "editora")}
            />
            <Box>
              <Input
                id="autores"
                label="Autores"
                onBlur={handleAutor}
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
              <Text>{form.autores.join(" - ")}</Text>
            </Box>
            <Box>
              <label htmlFor="descricao" className={styles.label}>
                Descrição
              </label>
              <textarea
                id="descricao"
                className={styles.textarea}
                value={form.descricao}
                onChange={(e) => handleChange(e, "descricao")}
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
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    quantidade: parseInt(e.target.value),
                  }))
                }
              />
            </Box>
          </Box>
          <Box className={styles.modalImageContainer}>
            <Img
              className={styles.modalImage}
              src={previewUrl || "/image-example.svg"}
              alt="Pré-visualização da imagem"
              width={220}
              height={300}
            />
            <input
              id="img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Box>
        </Box>

        <Dialog.Actions className={styles.actions}>
          <Dialog.Close asChild>
            <Button variant="tertiary">Cancelar</Button>
          </Dialog.Close>
          <Button onClick={handleSubmitChange}>Adicionar livro</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  );
}
