"use client";

import LoginModal from "@/components/login-modal";
import { getTokenHeader } from "@/lib/getTokenHeader";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    if (!getTokenHeader()) {
      setIsRegisterModalOpen(true);
    }
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <LoginModal
        open={isRegisterModalOpen}
        onOpenChange={() => setIsRegisterModalOpen(false)}
      />
    </main>
  );
}
