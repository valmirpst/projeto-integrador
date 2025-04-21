import { inter } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import GlobalContainer from "@/components/global-container";
import Menu from "@/components/menu";

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
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${inter.className}`}>
        <GlobalContainer>
          <Menu />
          {children}
        </GlobalContainer>
      </body>
    </html>
  );
}
