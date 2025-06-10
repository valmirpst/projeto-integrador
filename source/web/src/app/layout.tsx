import { inter } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import GlobalContainer from "@/components/global-container";
import Menu from "@/components/menu";
import { Box } from "@/components/ui/box";
import { api } from "@/lib/api";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: {
    default: "Biblioteca | Projeto Integrador 2025",
    template: "%s | Biblioteca | Projeto Integrador 2025",
  },
  description:
    "Biblioteca Virtual desenvolvida no curso Técnico em Informática na UTFPR.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userResponse = await api.usuarios.getByIdAsync("u10");

  if (!userResponse.data) return <Text>Erro ao buscar usuário</Text>;

  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${inter.className}`}>
        <GlobalContainer>
          <Box>
            <Menu user={userResponse.data} />
          </Box>
          {children}
        </GlobalContainer>
      </body>
    </html>
  );
}
