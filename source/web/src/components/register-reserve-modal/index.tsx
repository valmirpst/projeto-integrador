"use client";

import { BookType } from "@/@types/book";
import { ReserveType } from "@/@types/reserve";
import { UserType } from "@/@types/user";
import { Dialog } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import styles from "./register-reserve-modal.module.css";

export type PropsRegisterReservaModalType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formdata?: ReserveType;
  update?: boolean;
};

export default function RegisterReserveModal({ open, onOpenChange, formdata, update }: PropsRegisterReservaModalType) {
  const [form, setForm] = useState({
    id_usuario: "",
    isbn_livro: "",
    id_bibliotecario: "",
    status: "ativo" as "ativo" | "inativo",
  });
  const [users, setUsers] = useState<UserType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await api.usuarios.getAsync(getTokenHeader()!);
      if (userRes.data) {
        setUsers(userRes.data);
      }
      const livroRes = await api.livros.getAsync(getTokenHeader()!);
      if (livroRes.data) {
        setBooks(livroRes.data);
      }
    };
    fetchData();
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof typeof form) => {
    const { value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const isValid = Object.values(form).every(value => value !== "");
    console.log(form);

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
          <Dialog.Title className={styles.modalTitle}>{update ? "Atualizar Reserva" : "Registrar Reserva"}</Dialog.Title>
          <Dialog.Close />

          <Box>
            <label htmlFor="usuario" className={styles.label}>
              Status
            </label>
            <select id="usuario" className={styles.select} value={form.id_usuario} onChange={e => handleChange(e, "id_usuario")}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nome}
                </option>
              ))}
            </select>
          </Box>
          <Box>
            <label htmlFor="book" className={styles.label}>
              Livro
            </label>
            <select id="book" className={styles.select} value={form.isbn_livro} onChange={e => handleChange(e, "isbn_livro")}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              {books.map(user => (
                <option key={user.isbn} value={user.isbn}>
                  {user.titulo}
                </option>
              ))}
            </select>
          </Box>
          <Box>
            <label htmlFor="Bibliotecario" className={styles.label}>
              Bibliotecário
            </label>
            <select
              id="bibliotecario"
              className={styles.select}
              value={form.id_bibliotecario}
              onChange={e => handleChange(e, "id_bibliotecario")}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {users
                .filter(value => value.perfil === "bibliotecario")
                .map(user => (
                  <option key={user.id} value={user.id}>
                    {user.nome}
                  </option>
                ))}
            </select>
          </Box>
          <Box>
            <label htmlFor="status" className={styles.label}>
              Status
            </label>
            <select id="status" className={styles.select} value={form.status} onChange={e => handleChange(e, "status")}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </Box>

          <Box className={styles.actions}>
            <Dialog.Close asChild>
              <Button variant="tertiary">Cancelar</Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>{update ? "Atualizar Reserva" : "Adicionar Reserva"}</Button>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
