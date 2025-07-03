"use client";

import { BookType } from "@/@types/book";
import { api } from "@/lib/api";
import { getTokenHeader, parseJwt } from "@/lib/getTokenHeader";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const ClientSide = dynamic(() => import("./client"));

export default function Livros() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const booksResponse = await api.livros.getAsync();

        if (booksResponse.status === 401) {
          setError("Não autorizado");
          return;
        }

        if (!booksResponse.ok || !booksResponse.data) {
          setError("Erro ao buscar livros.");
          return;
        }
        setBooks(booksResponse.data);

        const userToken = getTokenHeader()?.options.headers.Authorization.split(" ")[1];
        if (!userToken) return;

        const parsedToken = parseJwt(userToken);
        const userResponse = await api.usuarios.getByIdAsync(parsedToken?.payload.id || "", getTokenHeader() || {});

        if (userResponse.ok && userResponse.data?.perfil === "bibliotecario") {
          router.push("/admin/dashboard");
          return;
        }
      } catch (err) {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 size={32} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <ClientSide books={books} />;
}
