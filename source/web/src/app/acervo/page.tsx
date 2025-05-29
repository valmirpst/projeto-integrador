import { api } from "@/lib/api";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Home() {
  const { ok, status, data, message } = await api.livros.getAsync();

  if (!ok || !data) return <p>Erro ao buscar livros.</p>;

  console.log(ok, status, data, message);

  return <ClientSide books={data} />;
}
