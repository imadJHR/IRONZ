"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook pour protéger les routes admin en vérifiant la présence 
 * d'un code d'accès dans le localStorage.
 */
export default function useAdminAuth(): void {
  const router = useRouter();

  useEffect(() => {
    const code: string | null = localStorage.getItem("admin_code");

    // Pas de code → redirection vers la page de connexion admin
    if (!code) {
      router.push("/admin");
      return;
    }

    // Format invalide (doit être 6 chiffres) → nettoyage et redirection
    if (!/^\d{6}$/.test(code)) {
      localStorage.removeItem("admin_code");
      router.push("/admin");
    }
  }, [router]);
}