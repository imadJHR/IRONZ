import type { Metadata } from "next";
import BlackFridaySection from "../../components/black-friday-section";
import Link from "next/link";
import { blackFridayBreadcrumbs, blackFridayCollectionSchema } from "../../lib/black-friday-seo";

export const metadata: Metadata = {
  title: "Black Friday : packs suppléments | IRONZ Maroc",
  description: "Découvrez les 6 packs Black Friday IRONZ dès 875 DH. Whey, créatine, Cream of Rice et vitamines. Livraison gratuite partout au Maroc.",
  alternates: { canonical: "/black-friday" },
  openGraph: {
    title: "Packs Black Friday IRONZ au Maroc",
    description: "6 packs de nutrition sportive dès 875 DH. Livraison offerte partout au Maroc.",
    url: "/black-friday",
    type: "website",
    locale: "fr_MA",
    images: [{ url: "/black-friday/pack-muscle-energy-whey-creatine-maroc.webp", width: 1254, height: 1254, alt: "Pack Muscle & Energy IRONZ" }],
  },
  twitter: { card: "summary_large_image", title: "Packs Black Friday IRONZ", description: "Whey, créatine, crème de riz et vitamines dès 875 DH. Livraison gratuite au Maroc.", images: ["/black-friday/pack-muscle-energy-whey-creatine-maroc.webp"] },
};

export default function BlackFridayPage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blackFridayCollectionSchema()).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blackFridayBreadcrumbs()).replace(/</g, "\\u003c") }} />
    <BlackFridaySection standalone />
    <section aria-labelledby="choose-pack" className="bg-[#111111] pb-16 text-zinc-300 sm:pb-24">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div><h2 id="choose-pack" className="font-display text-3xl uppercase text-white">Quel pack Black Friday choisir ?</h2><p className="mt-5 text-sm leading-7">Comparez les produits compris dans chaque lot. Muscle & Energy associe whey, créatine et crème de riz ; Premium Wellness réunit whey, collagène et vitamines. Fitness Premium met la Cream of Rice à l’honneur, tandis que Fitness & Santé comprend le gainer Dynamix de 6 kg. Les deux packs Performance proposent des combinaisons différentes autour de la créatine.</p><Link href="/categories/supplement" className="mt-4 inline-flex min-h-11 items-center text-sm text-yellow-400 underline underline-offset-4">Parcourir tous les suppléments IRONZ</Link></div>
        <div className="space-y-1">
          <details className="border-b border-white/15 py-5"><summary className="cursor-pointer font-semibold text-white">La livraison des packs est-elle gratuite ?</summary><p className="mt-3 text-sm leading-7">Oui, les six offres Black Friday présentées ici comprennent la livraison gratuite partout au Maroc. Le prix affiché correspond au pack complet.</p></details>
          <details className="border-b border-white/15 py-5"><summary className="cursor-pointer font-semibold text-white">Le scanner InBody 270 est-il inclus ?</summary><p className="mt-3 text-sm leading-7">Le Pack Premium Wellness comprend une consultation InBody 270 et le Fitness File. Le scanner représenté sur l’affiche et le dossier n’est pas un appareil vendu dans le pack.</p></details>
          <details className="border-b border-white/15 py-5"><summary className="cursor-pointer font-semibold text-white">Comment comparer les réductions ?</summary><p className="mt-3 text-sm leading-7">Chaque fiche indique le prix du pack, son prix de référence et l’économie en dirhams. Le pourcentage est calculé à partir de ces prix et arrondi à deux décimales. Vous pouvez ainsi comparer les réductions et le contenu précis des six offres.</p></details>
        </div>
      </div>
    </section>
  </main>;
}
