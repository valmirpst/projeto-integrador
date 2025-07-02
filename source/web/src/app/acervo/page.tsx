import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { get } from "http";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Home() {
  const { ok, status, data, message } = await api.livros.getAsync(
    getTokenHeader()
  );

  if (!ok || !data) return <p>Erro ao buscar livros.</p>;

  console.log(ok, status, data, message);

  return <ClientSide books={data} />;
}
