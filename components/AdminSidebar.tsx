"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle, LucideProps } from "lucide-react";

// Type for admin navigation routes - ensures type-safe navigation
type AdminRoute = 
  | "/admin/dashboard"
  | "/admin/products"
  | "/admin/products/add"
  | "/admin";

// Type for the goTo handler
type GoToHandler = (path: AdminRoute) => void;

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const goTo: GoToHandler = (path) => {
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

  // Helper to determine active state with type safety
  const isActive = (route: AdminRoute): boolean => pathname === route;

  // Icon props for consistent typing
  const iconProps: Partial<LucideProps> = { size: 18, ariaHidden: true };

  return (
    <aside className="w-64 bg-white border-r border-yellow-500/30 p-6 min-h-screen shadow-md">

      {/* HEADING */}
      <h2 className="text-2xl font-bold mb-8 text-gray-900 tracking-wide">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3" role="navigation" aria-label="Admin navigation">

        {/* DASHBOARD */}
        <button
          onClick={() => goTo("/admin/dashboard")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
            ${isActive("/admin/dashboard") ? activeClass : defaultClass}`}
          type="button"
          aria-current={isActive("/admin/dashboard") ? "page" : undefined}
        >
          <LayoutDashboard {...iconProps} />
          <span>Dashboard</span>
        </button>

        {/* PRODUCTS */}
        <button
          onClick={() => goTo("/admin/products")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
            ${isActive("/admin/products") ? activeClass : defaultClass}`}
          type="button"
          aria-current={isActive("/admin/products") ? "page" : undefined}
        >
          <Package {...iconProps} />
          <span>Products</span>
        </button>

        {/* ADD PRODUCT */}
        <button
          onClick={() => goTo("/admin/products/add")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
            ${isActive("/admin/products/add") ? activeClass : defaultClass}`}
          type="button"
          aria-current={isActive("/admin/products/add") ? "page" : undefined}
        >
          <PlusCircle {...iconProps} />
          <span>Add Product</span>
        </button>

      </nav>
    </aside>
  );
}