"use client";

import { Dialog } from "@/components/ui/dialog";
import { Box } from "../ui/box";
import styles from "./confirmation-trash-modal.module.css";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react"; 
import { theme } from "@/theme";

type PropsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ConfirmationTrash({ open, onOpenChange }: PropsType) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={400} className={`${styles.modalContent} ${styles.successModal}`}>
        <Box className={styles.modalInputs} style={{ textAlign: "center" }}>
          <AlertTriangle size={45} color={theme.colors.danger500} style={{ margin: "0 auto" }} />
          <Dialog.Title className={styles.modalTitle} style={{ marginTop: "0.5rem" }}>
            Livro excluído com sucesso!
          </Dialog.Title>
          <Dialog.Description style={{ color: "var(--gray-500) ", marginTop: "0.5rem", fontSize: "16px" }}>
            O livro foi removido permanentemente do sistema
              </Dialog.Description>

          <Dialog.Actions className={styles.actions} style={{ justifyContent: "center", marginTop: "2rem" }}>
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </Dialog.Actions>
        </Box> 
      </Dialog.Content>
    </Dialog.Root>
  );
}


