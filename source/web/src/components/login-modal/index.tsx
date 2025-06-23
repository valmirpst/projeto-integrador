"use client";

import { Dialog } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import styles from "./register-user-modal.module.css";
import { Button } from "../ui/button";
import Img from "../ui/img";
import { useState } from "react";
import { api } from "@/lib/api";
import { UserType } from "@/@types/user";
import { LoginType } from "@/@types/login";

export type PropsRegisterModalType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formdata?: UserType;
  update?: boolean;
};

export default function LoginModal({
  open,
  onOpenChange,
}: PropsRegisterModalType) {
  const [form, setForm] = useState<LoginType>({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const isValid = Object.values(form).every((v) => v !== "");
    if (!isValid) return;

    await api.usuarios.postAsync({ payload: form });
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
          <Dialog.Title className={styles.modalTitle}>Login</Dialog.Title>
          <Dialog.Close />

          <Input
            id="email"
            label="E-mail"
            className={styles.labelCinza}
            value={form.email}
            onChange={(e) => handleChange(e, "email")}
          />
          <Input
            id="senha"
            label="Senha"
            type="password"
            className={styles.labelCinza}
            value={form.senha}
            onChange={(e) => handleChange(e, "senha")}
          />

          <Dialog.Actions className={styles.actions}>
            <Dialog.Close asChild>
              <Button variant="tertiary">Cancelar</Button>
            </Dialog.Close>
            <Button onClick={handleSubmit}>Entrar</Button>
          </Dialog.Actions>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
