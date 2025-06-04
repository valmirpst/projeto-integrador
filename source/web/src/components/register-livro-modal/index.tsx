"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Text } from "../ui/text";
import { Box } from "../ui/box";
import styles from "./register-livro-modal.module.css";
import { Button } from "../ui/button";

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RegisterLivroModal({ open, onOpenChange }: PropsType) {
  const [form, setForm] = useState({
    titulo: "",
    edicao: "",
    genero: "",
    editora: "",
    descricao: "",
    quantidade: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Text className={styles.addLivro}>Adicionar Livro</Text>
      </Dialog.Trigger>

      <Dialog.Content width={600} className={styles.modalContent}>
        <Dialog.Title className={styles.modalTitle}>Bem-vindo</Dialog.Title>
        <Dialog.Close />

        <Input
          id="titulo"
          label="Título"
          value={form.titulo}
          onChange={handleChange}
        />

        <Box className={styles.row}>
          <Input
            id="edicao"
            label="Edição"
            value={form.edicao}
            onChange={handleChange}
          />
          <Input
            id="genero"
            label="Gênero"
            value={form.genero}
            onChange={handleChange}
          />
        </Box>

        <Input
          id="editora"
          label="Editora"
          value={form.editora}
          onChange={handleChange}
        />

        <label htmlFor="descricao" className={styles.label}>
          Descrição
        </label>
        <textarea
          id="descricao"
          className={styles.textarea}
          value={form.descricao}
          onChange={handleChange}
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
            value={form.quantidade}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                quantidade: parseInt(e.target.value),
              }))
            }
          />
        </Box>

        <Dialog.Actions className={styles.actions}>
          <Dialog.Close asChild>
            <Button variant="tertiary">Adicionar livro</Button>
          </Dialog.Close>
          <Button>Adicionar livro</Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Root>
  );
}
