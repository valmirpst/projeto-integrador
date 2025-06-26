import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

type LivroProps = {
  params: Promise<{ isbn: string }>;
};

export default async function Livro({ params }: LivroProps) {
  const { isbn } = await params;

  return <ClientSide isbn={isbn} />;
}
