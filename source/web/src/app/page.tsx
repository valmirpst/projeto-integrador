// app/page.tsx
import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Home() {
  const booksResponse = await api.livros.getAsync();
  const userResponse = await api.usuarios.getByIdAsync("u10");

  if (userResponse.ok && userResponse.data?.perfil === "bibliotecario") {
    redirect("/admin/dashboard"); // <- redireciona imediatamente
  }

  if (!booksResponse.ok || !booksResponse.data) {
    return <p>Erro ao buscar livros.</p>;
  }

  return <ClientSide books={booksResponse.data} />;
}
