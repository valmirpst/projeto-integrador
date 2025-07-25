import type { Metadata } from "next";
import { Box } from "@/components/ui/box";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: {
    default: "Biblioteca | Projeto Integrador 2025",
    template: "%s | Biblioteca | Projeto Integrador 2025",
  },
  description:
    "Biblioteca Virtual desenvolvida no curso Técnico em Informática na UTFPR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Box className={styles.adminGlobalContainer}>{children}</Box>;
}
