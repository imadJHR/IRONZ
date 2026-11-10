"use client";

import { useState } from "react";
import BlackFridayImage from "./black-friday-image";
import Link from "next/link";
import { PackIcon } from "./black-friday-icons";
import { BLACK_FRIDAY_PACKS, getBlackFridaySavings } from "../lib/black-friday";
import BlackFridayCartButton from "./black-friday-cart-button";
import styles from "./black-friday.module.css";
import { useCart } from "../context/cart-context";

const price = (value: number) => `${new Intl.NumberFormat("fr-MA").format(value)} DH`;
const filters = [
  { id: "all", label: "Tous les packs" },
  { id: "whey", label: "Whey & collagène" },
  { id: "rice", label: "Cream of Rice" },
  { id: "creatine", label: "Créatine" },
  { id: "gainer", label: "Mass Gainer" },
];

export default function BlackFridaySection({ standalone = false }: { standalone?: boolean }) {
  const [filter, setFilter] = useState("all");
  const { mounted } = useCart();
  const Heading = standalone ? "h1" : "h2";
  const packs = BLACK_FRIDAY_PACKS.filter((pack) => filter === "all" || pack.filters.includes(filter));

  return (
    <section id="black-friday" aria-labelledby="black-friday-title" className="scroll-mt-24 overflow-hidden border-y border-white/10 bg-[#111111] py-8 text-white sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className={styles.header}>
          <div>
            <Heading id="black-friday-title" className={styles.heading}>Black <span className="text-yellow-400">Friday.</span>{standalone && <span className="mt-3 block font-sans text-base font-semibold normal-case leading-snug tracking-normal text-zinc-200 sm:text-xl">Packs de nutrition sportive au Maroc</span>}</Heading>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">{standalone ? "Comparez nos 6 packs de whey, créatine, crème de riz, gainer et vitamines. Livraison offerte au Maroc." : "Whey, créatine, crème de riz : 6 packs à prix réduit."}</p>
          </div>
          <div className={styles.offer}>
            <div className={styles.ticket}><p className={styles.ticketLabel}>À partir de</p><p className={styles.ticketPrice}>875 <small>DH</small></p></div>
            <p className={styles.delivery}><PackIcon name="delivery" className="h-5 w-5 shrink-0 text-yellow-400" /><span>Livraison offerte<br />partout au Maroc</span></p>
          </div>
        </div>
        <div role="group" aria-label="Filtrer les packs par produit" className={styles.rail}>
          {filters.map((item) => {
            const count = BLACK_FRIDAY_PACKS.filter((pack) => item.id === "all" || pack.filters.includes(item.id)).length;
            return <button key={item.id} type="button" disabled={!mounted} aria-label={item.label} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className={styles.filter}>{item.label}<span aria-hidden="true">{count}</span></button>;
          })}
        </div>
        <p role="status" aria-live="polite" className="sr-only">{packs.length} {packs.length > 1 ? "packs disponibles" : "pack disponible"}</p>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {packs.map((pack, index) => {
            const href = `/produit/${pack.slug}`;
            const savings = getBlackFridaySavings(pack);
            return (
              <article key={pack.id} className={`${styles.card} group flex min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1b1b1b] hover:border-yellow-400/50`}>
                <Link href={href} aria-label={`Découvrir ${pack.name}`} className="block overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-yellow-400 focus-visible:-outline-offset-4">
                  <BlackFridayImage src={pack.image} alt={pack.imageAlt} eager={standalone && index < 3} priority={standalone && index === 0} sizes="(max-width: 639px) calc(50vw - 22px), (max-width: 1023px) 50vw, (max-width: 1399px) 33vw, 430px" className={`${styles.photo} aspect-square w-full object-contain`} />
                </Link>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-6">
                  <p className="mb-2 min-h-8 text-[10px] font-medium leading-4 text-yellow-400 sm:min-h-0 sm:text-xs">{pack.subtitle}</p>
                  <h3 className="min-h-11 font-display text-lg uppercase leading-tight sm:min-h-0 sm:text-[1.7rem]"><Link href={href} className="hover:text-yellow-400 focus-visible:outline-2 focus-visible:outline-yellow-400">{pack.name}</Link></h3>
                  <details className="mb-5 mt-3 text-sm text-zinc-300">
                    <summary className="min-h-11 w-fit cursor-pointer py-3 text-[10px] underline decoration-zinc-600 underline-offset-4 focus-visible:outline-2 focus-visible:outline-yellow-400 sm:text-xs">Contenu du pack</summary>
                    <ul className="mt-3 space-y-2 pb-1">{pack.features.map((feature) => <li key={feature} className="text-[11px] leading-relaxed sm:text-xs">{feature}</li>)}</ul>
                  </details>
                  <div className="mt-auto border-t border-white/10 pb-4 pt-4">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="font-display text-2xl tracking-wide text-white sm:text-3xl">{price(pack.price)}</span><del className="text-[10px] text-zinc-400 sm:text-sm">{price(pack.oldPrice)}</del></div>
                    <p className="mt-1.5 text-[10px] text-yellow-400 sm:text-xs">−{savings.percentageLabel} % · {price(savings.amount)} d’économie</p>
                  </div>
                  <BlackFridayCartButton pack={pack} compact />
                </div>
              </article>
            );
          })}
        </div>
        {!standalone && <div className="mt-9 flex justify-center"><Link href="/black-friday" className="inline-flex min-h-12 items-center border-b border-yellow-400 pb-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400">Toutes les offres Black Friday</Link></div>}
      </div>
    </section>
  );
}
