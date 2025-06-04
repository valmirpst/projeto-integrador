import { api } from "@/lib/api";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Home() {
  const booksResponse = await api.livros.getAsync();
  const usuariosResponse = await api.usuarios.getAsync();

  if (!booksResponse.ok || !booksResponse.data)
    return <p>Erro ao buscar livros.</p>;

  return <ClientSide books={booksResponse.data} />;
}
