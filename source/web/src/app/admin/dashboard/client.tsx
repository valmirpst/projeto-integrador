"use client";

import { UserType } from "@/@types/user";
import LoginModal from "@/components/login-modal";
import { api } from "@/lib/api";
import { getTokenHeader, parseJwt } from "@/lib/getTokenHeader";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!getTokenHeader()) {
      setIsRegisterModalOpen(true);
    }

    const token = getTokenHeader()?.options.headers.Authorization.split(" ")[1];
    if (!token) return;
    const parsedToken = parseJwt(token);
    const usuario = parsedToken?.payload as { id: string; nome: string; email: string };
    fetchUser(usuario);

    async function fetchUser(userFromToken: { id: string; nome: string; email: string }) {
      const { data } = await api.usuarios.getByIdAsync(userFromToken.id, getTokenHeader() || {});
      setUser(data || null);
    }
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <LoginModal user={user} open={isRegisterModalOpen} onOpenChange={() => setIsRegisterModalOpen(false)} />
    </main>
  );
}
