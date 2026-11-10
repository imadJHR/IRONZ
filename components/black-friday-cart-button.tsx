"use client";

import { useState } from "react";
import Link from "next/link";
import { PackIcon } from "./black-friday-icons";
import { useCart } from "../context/cart-context";
import type { BlackFridayPack } from "../lib/black-friday";
import styles from "./black-friday.module.css";

export default function BlackFridayCartButton({ pack, withQuantity = false, compact = false }: { pack: BlackFridayPack; withQuantity?: boolean; compact?: boolean }) {
  const { addToCart, mounted } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div>
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        {withQuantity && <div className="flex shrink-0 items-center rounded-lg border border-white/20">
          <button type="button" aria-label="Diminuer la quantité" disabled={!mounted || quantity === 1} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-12 w-11 touch-manipulation items-center justify-center disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-yellow-400"><PackIcon name="minus" width={16} height={16} /></button>
          <span aria-label={`Quantité : ${quantity}`} className="w-7 text-center tabular-nums">{quantity}</span>
          <button type="button" aria-label="Augmenter la quantité" disabled={!mounted} onClick={() => setQuantity(quantity + 1)} className="flex h-12 w-11 touch-manipulation items-center justify-center disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-yellow-400"><PackIcon name="plus" width={16} height={16} /></button>
        </div>}
        <button type="button" disabled={!mounted} aria-label={`Ajouter ${pack.name} au panier`} onClick={() => {
          addToCart({ id: pack.id, slug: pack.slug, name: pack.name, price: pack.price, oldPrice: pack.oldPrice, image: pack.image, category: "Black Friday", quantity });
          setAdded(true);
        }} className={`${styles.button} flex min-h-11 w-full touch-manipulation items-center justify-center rounded-md bg-yellow-400 px-2 py-3 text-xs font-bold text-zinc-950 hover:bg-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 sm:min-h-12 sm:px-3 sm:text-sm`}>
          {compact ? <><span className="sm:hidden">{added ? "Ajouter encore" : "Ajouter"}</span><span className="hidden sm:inline">{added ? "Ajouter encore" : "Ajouter au panier"}</span></> : added ? "Ajouter encore" : "Ajouter au panier"}
        </button>
      </div>
      <div className={`flex min-h-8 gap-1 pt-2 text-[10px] leading-relaxed sm:text-xs ${compact ? "flex-col sm:flex-row sm:items-center sm:justify-between" : "items-center justify-between"}`} role="status" aria-live="polite">
        <span className={added ? "text-yellow-300" : "text-zinc-400"}>{added ? "Ajouté au panier" : "Livraison offerte"}</span>
        {added && <Link href="/panier" className="inline-flex min-h-6 items-center font-semibold text-yellow-400 underline underline-offset-4">Voir le panier</Link>}
      </div>
    </div>
  );
}
