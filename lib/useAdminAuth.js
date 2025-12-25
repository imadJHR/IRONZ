"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const code = localStorage.getItem("admin_code");

    // No code → redirect to login
    if (!code) {
      router.push("/admin");
      return;
    }

    // Invalid format → redirect
    if (!/^\d{6}$/.test(code)) {
      localStorage.removeItem("admin_code");
      router.push("/admin");
    }
  }, []);
}
