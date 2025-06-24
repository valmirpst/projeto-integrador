"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import styles from "./register-reserve-modal.module.css";
import { Button } from "../ui/button";
import { api } from "@/lib/api";
import { ReserveType } from "@/@types/reserve";
import { getTokenHeader } from "@/lib/getTokenHeader";

export type PropsRegisterReservaModalType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formdata?: ReserveType;
  update?: boolean;
};

export default function RegisterReserveModal({
  open,
  onOpenChange,
  formdata,
  update,
}: PropsRegisterReservaModalType) {
  const [form, setForm] = useState({
    id_usuario: "",
    isbn_livro: "",
    id_bibliotecario: "",
    status: "ativo" as "ativo" | "inativo",
  });

  useEffect(() => {
    if (formdata) {
      setForm({
        id_usuario: formdata.id_usuario,
        isbn_livro: formdata.isbn_livro,
        id_bibliotecario: formdata.id_bibliotecario,
        status: formdata.status,
      });
    }
  }, [formdata]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof typeof form
  ) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const isValid = Object.values(form).every((value) => value !== "");

    if (isValid) {
      if (update && formdata?.id) {
        await api.reservas.putAsync(formdata.id, {
          payload: form,
          ...getTokenHeader(),
        });
      } else {
        await api.reservas.postAsync({ payload: form, ...getTokenHeader() });
      }

      setForm({
        id_usuario: "",
        isbn_livro: "",
        id_bibliotecario: "",
        status: "ativo",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={500} className={styles.modalContainer}>
        <Box className={styles.modalInputs}>
          <Dialog.Title className={styles.modalTitle}>
            {update ? "Atualizar Reserva" : "Registrar Reserva"}
          </Dialog.Title>
          <Dialog.Close />

          <Input
            id="id_usuario"
            label="Usuário"
            value={form.id_usuario}
            onChange={(e) => handleChange(e, "id_usuario")}
          />
          <Input
            id="isbn_livro"
            label="Livro (ISBN)"
            value={form.isbn_livro}
            onChange={(e) => handleChange(e, "isbn_livro")}
          />
          <Input
            id="id_bibliotecario"
            label="Bibliotecário"
            value={form.id_bibliotecario}
            onChange={(e) => handleChange(e, "id_bibliotecario")}
          />

          <Box>
            <label htmlFor="status" className={styles.label}>
              Status
            </label>
            <select
              id="status"
              className={styles.select}
              value={form.status}
              onChange={(e) => handleChange(e, "status")}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </Box>

          <Box className={styles.actions}>
            <Dialog.Close asChild>
              <Button variant="tertiary">Cancelar</Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>
              {update ? "Atualizar Reserva" : "Adicionar Reserva"}
            </Button>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
