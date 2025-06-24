// app/page.tsx
import { redirect } from "next/navigation";
// import { api } from "@/lib/api";
// import dynamic from "next/dynamic";
import { Metadata } from "next";
// import { getTokenHeader } from "@/lib/getTokenHeader";

// const ClientSide = dynamic(() => import("./client"));

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Livros() {
  // const booksResponse = await api.livros.getAsync(getTokenHeader());

  redirect("/admin/dashboard");
  // if (userResponse.ok && userResponse.data?.perfil === "bibliotecario") {
  //   redirect("/admin/dashboard");
  // }

  // if (!booksResponse.ok || !booksResponse.data) {
  //   return <p>Erro ao buscar livros.</p>;
  // }

  // return <ClientSide books={booksResponse.data} />;
}
