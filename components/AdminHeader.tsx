"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

// Type for the logout handler event
type LogoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

export default function AdminHeader() {
  const router = useRouter();

  const logout: LogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin_code");
    router.push("/admin");
  };

  return (
    <header className="w-full bg-white border-b-2 border-yellow-500 p-4 flex items-center justify-between shadow-sm">

      {/* LEFT — Admin Badge */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full 
                        bg-yellow-100 border border-yellow-500 text-yellow-700 font-bold">
          <User size={20} aria-hidden="true" />
        </div>
        <span className="text-gray-800 font-semibold tracking-wide text-lg">
          Admin Panel
        </span>
      </div>

      {/* RIGHT — Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-yellow-500 
                   text-black font-semibold shadow hover:shadow-lg hover:bg-yellow-400 
                   active:scale-95 transition-all"
        type="button"
        aria-label="Déconnexion"
      >
        <LogOut size={18} aria-hidden="true" />
        Logout
      </button>
    </header>
  );
}