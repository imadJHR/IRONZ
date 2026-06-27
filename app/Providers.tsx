"use client";

import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { CartProvider } from "../context/cart-context";
import { FavoritesProvider } from "../context/favorites-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <CartProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
