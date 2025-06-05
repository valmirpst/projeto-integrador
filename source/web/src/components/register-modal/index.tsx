"use client";

import { Dialog } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { Box } from "../ui/box";
import styles from "./register-livro-modal.module.css";
import { Button } from "../ui/button";
import Img from "../ui/img";
import { useState } from "react";
import { api } from "@/lib/api";

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RegisterLivroModal({ open, onOpenChange }: PropsType) {
  const [form, setForm] = useState({
    isbn: "",
    titulo: "",
    edicao: "",
    genero: "",
    editora: "",
    descricao: "",
    qtd_disponivel: 1,
    autores: [],
    caminho_img: "",
    total_avaliacoes: 0,
    total_estrelas: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const { value } = e.target;
  };

  const handleSubmitChange = async () => {
    const isValid = Object.values(form).every(
      (value) => value !== "" && value !== null
    );

    if (!isValid) {
      await api.livros.postAsync({ payload: form });
      setForm({
        isbn: "",
        titulo: "",
        edicao: "",
        genero: "",
        editora: "",
        descricao: "",
        qtd_disponivel: 1,
        autores: [],
        caminho_img: "",
        total_avaliacoes: 0,
        total_estrelas: 0,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Text className={styles.addLivro}>Adicionar Livro</Text>
      </Dialog.Trigger>

      <Dialog.Content width={800} className={styles.modalContent}>
        <Box className={styles.modalInputs}>
          <Dialog.Title className={styles.modalTitle}>Bem-vindo</Dialog.Title>
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
          <Text>autores</Text>

          <label htmlFor="descricao" className={styles.label}>
            Descrição
          </label>
          <textarea
            id="descricao"
            className={styles.textarea}
            value={form.descricao}
            onChange={(e) => handleChange(e, "descricao")}
          />
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
