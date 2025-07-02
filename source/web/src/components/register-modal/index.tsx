"use client";

import { Dialog } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import styles from "./register-user-modal.module.css";
import { Button } from "../ui/button";
import Img from "../ui/img";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Select from "../ui/select";
import { UserType } from "@/@types/user";
import { getTokenHeader } from "@/lib/getTokenHeader";

export type PropsRegisterModalType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formdata?: UserType;
  update?: boolean;
};

export default function RegisterModal({
  open,
  onOpenChange,
  formdata,
  update,
}: PropsRegisterModalType) {
  const [form, setForm] = useState<UserType>({
    id: String(new Date().getTime()),
    nome: "",
    sobrenome: "teste",
    perfil: "aluno",
    data_nasc: "",
    ra: "",
    ciape: "",
    telefone: "",
    email: "",
    senha: "123456",
    id_cursos: [],
    siape: "",
  });

  useEffect(() => {
    if (formdata) {
      setForm(formdata);
    }
  }, [formdata]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const isValid =
      form.nome && form.email && form.perfil && form.data_nasc && form.telefone;
    if (!isValid) return;

    await api.usuarios.postAsync({ payload: form, ...getTokenHeader() });
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={900} className={styles.modalContent}>
        <Box className={styles.modalImageContainer}>
          <Img
            src="/library.jpg"
            alt=""
            width={337}
            height={497}
            className={styles.modalImage}
          />
        </Box>

        <Box className={styles.modalInputs}>
          <Dialog.Title className={styles.modalTitle}>Cadastro</Dialog.Title>
          <Dialog.Close />

          <Box className={styles.row}>
            <Input
              id="nome"
              label="Nome"
              className={styles.labelCinza}
              value={form.nome}
              onChange={(e) => handleChange(e, "nome")}
            />
            <select
              id="usuario"
              className={styles.select}
              value={form.perfil}
              onChange={(e) => handleChange(e, "perfil")}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="bibliotecario">Bibliotecário</option>
            </select>
          </Box>

          <Box className={styles.row}>
            <Input
              id="ra"
              label="Registro Acadêmico"
              className={styles.labelCinza}
              value={form.ra}
              onChange={(e) => handleChange(e, "ra")}
            />
            <Input
              id="ciape"
              label="Ciape"
              className={styles.labelCinza}
              value={form.ciape}
              onChange={(e) => handleChange(e, "ciape")}
            />
          </Box>

          <Box className={styles.row}>
            <Input
              id="telefone"
              label="Telefone"
              className={styles.labelCinza}
              value={form.telefone}
              onChange={(e) => handleChange(e, "telefone")}
            />
            <Input
              id="nascimento"
              label="Nascimento"
              className={styles.labelCinza}
              type="date"
              value={form.data_nasc}
              onChange={(e) => handleChange(e, "data_nasc")}
            />
          </Box>

          <Input
            id="email"
            label="E-mail"
            className={styles.labelCinza}
            value={form.email}
            onChange={(e) => handleChange(e, "email")}
          />
          <Select
            options={["c1", "c2", "c3"]}
            label="Cursos"
            width={200}
            activeValues={form.id_cursos}
            handleChange={(values) =>
              setForm((prev) => ({ ...prev, id_cursos: values }))
            }
          />

          <Dialog.Actions className={styles.actions}>
            <Dialog.Close asChild>
              <Button variant="tertiary">Cancelar</Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>Cadastrar</Button>
          </Dialog.Actions>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
