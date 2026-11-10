import Image from "next/image";
import Link from "next/link";
import { PackIcon } from "./black-friday-icons";
import { BLACK_FRIDAY_PACKS, getBlackFridaySavings, type BlackFridayPack } from "../lib/black-friday";
import { blackFridayBreadcrumbs, blackFridayProductSchema } from "../lib/black-friday-seo";
import BlackFridayCartButton from "./black-friday-cart-button";

const price = (value: number) => `${new Intl.NumberFormat("fr-MA").format(value)} DH`;

export default function BlackFridayProduct({ pack }: { pack: BlackFridayPack }) {
  const savings = getBlackFridaySavings(pack);
  const related = BLACK_FRIDAY_PACKS.filter((item) => item.id !== pack.id)
    .sort((a, b) => b.filters.filter((tag) => pack.filters.includes(tag)).length - a.filters.filter((tag) => pack.filters.includes(tag)).length)
    .slice(0, 4);
  return (
    <main className="bg-[#111111] pb-16 text-white sm:pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blackFridayProductSchema(pack)).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blackFridayBreadcrumbs(pack)).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 py-6 text-xs text-zinc-400 sm:py-8">
          <Link href="/" className="py-2 hover:text-yellow-400">Accueil</Link><span aria-hidden="true">/</span>
          <Link href="/black-friday" className="py-2 hover:text-yellow-400">Black Friday</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-zinc-200">{pack.name}</span>
        </nav>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-xl bg-white">
            <Image src={pack.image} alt={pack.imageAlt} width={1254} height={1254} preload quality={60} sizes="(max-width: 1023px) 100vw, 650px" className="aspect-square h-auto w-full object-contain" />
          </div>
          <div className="lg:py-4">
            <Link href="/black-friday" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-widest text-yellow-400">Tous les packs Black Friday</Link>
            <h1 className="mt-3 font-display text-4xl uppercase leading-[1.08] sm:text-5xl xl:text-6xl">{pack.name}</h1>
            <p className="mt-3 text-lg text-yellow-400">{pack.subtitle}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-300">{pack.description}</p>
            <div className="my-6 border-y border-white/15 py-5">
              <p className="flex flex-wrap items-baseline gap-4"><span className="font-display text-5xl">{price(pack.price)}</span><del className="text-lg text-zinc-500">{price(pack.oldPrice)}</del></p>
              <p className="mt-2 text-sm text-yellow-400">−{savings.percentageLabel} % · {price(savings.amount)} d’économie sur ce pack</p>
            </div>
            <BlackFridayCartButton pack={pack} withQuantity />
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs text-zinc-300">
              <span className="flex items-center gap-2"><PackIcon name="delivery" className="text-yellow-400" />Livraison gratuite au Maroc</span>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:mt-16 lg:grid-cols-2 lg:gap-14">
          <section aria-labelledby="pack-contents">
            <h2 id="pack-contents" className="font-display text-2xl uppercase sm:text-3xl">Ce que contient votre pack</h2>
            <ul className="mt-6 space-y-4">{pack.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-200"><PackIcon name="check" className="mt-0.5 shrink-0 text-yellow-400" />{feature}</li>)}</ul>
          </section>
          <section aria-labelledby="pack-details">
            <h2 id="pack-details" className="font-display text-2xl uppercase sm:text-3xl">Le pack en détail</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-300">{pack.longDescription}</p>
            <Link href="/categories/supplement" className="mt-5 inline-flex min-h-11 items-center text-sm text-yellow-400 underline underline-offset-4">Toute la nutrition sportive</Link>
          </section>
        </div>
        <section aria-labelledby="other-packs" className="mt-12 border-t border-white/15 pt-8 sm:mt-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h2 id="other-packs" className="font-display text-3xl uppercase">Comparez les autres packs</h2><Link href="/black-friday" className="text-sm text-yellow-400 underline underline-offset-4">Voir les 6 offres</Link></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">{related.map((item) => <Link key={item.id} href={`/produit/${item.slug}`} className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 focus-visible:outline-2 focus-visible:outline-yellow-400">
            <Image src={item.image} alt={item.imageAlt} width={600} height={600} quality={60} sizes="(max-width: 1279px) 50vw, 25vw" className="aspect-square w-full object-contain" />
            <div className="p-3 sm:p-5"><h3 className="font-display text-lg uppercase sm:text-xl">{item.name}</h3><p className="mt-2 text-sm font-semibold text-yellow-400">{price(item.price)}</p></div>
          </Link>)}</div>
        </section>
      </div>
    </main>
  );
}
