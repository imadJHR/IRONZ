"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle } from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const goTo = (path) => {
    const code = localStorage.getItem("admin_code");

    if (!code || !/^\d{6}$/.test(code)) {
      alert("Access denied. Invalid or missing code.");
      router.push("/admin");
      return;
    }

    router.push(path);
  };

  // ACTIVE STYLE
  const activeClass =
    "bg-yellow-500 text-black font-semibold shadow-sm";

  // NORMAL STYLE
  const defaultClass =
    "text-gray-700 hover:bg-yellow-100 hover:text-black";

  return (
    <aside className="w-64 bg-white border-r border-yellow-500/30 p-6 min-h-screen shadow-md">

      {/* HEADING */}
      <h2 className="text-2xl font-bold mb-8 text-gray-900 tracking-wide">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">

        {/* DASHBOARD */}
        <button
          onClick={() => goTo("/admin/dashboard")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
            ${pathname === "/admin/dashboard" ? activeClass : defaultClass}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        {/* PRODUCTS */}
        <button
          onClick={() => goTo("/admin/products")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
            ${pathname === "/admin/products" ? activeClass : defaultClass}`}
        >
          <Package size={18} />
          Products
        </button>

        {/* ADD PRODUCT */}
        <button
          onClick={() => goTo("/admin/products/add")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
            ${pathname === "/admin/products/add" ? activeClass : defaultClass}`}
        >
          <PlusCircle size={18} />
          Add Product
        </button>

      </nav>
    </aside>
  );
}
