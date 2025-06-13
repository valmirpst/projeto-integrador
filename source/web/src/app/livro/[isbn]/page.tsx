import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Livro({ params }: { params: { isbn: string } }) {
  const { isbn } = params;

  const booksResponse = await api.livros.getByIdAsync(isbn);

  if (!booksResponse.data) {
    return <Text>Erro ao buscar livro</Text>;
  }

  return <ClientSide book={booksResponse.data} />;
}
