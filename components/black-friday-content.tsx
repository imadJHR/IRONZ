import Link from "next/link";
import { BLACK_FRIDAY_PACKS, getBlackFridaySavings } from "../lib/black-friday";
import { SITE_ADDRESS } from "../lib/site";

const price = (value: number) => `${new Intl.NumberFormat("fr-MA").format(value)} DH`;
const minimumPrice = Math.min(...BLACK_FRIDAY_PACKS.map(pack => pack.price));
const maximumPrice = Math.max(...BLACK_FRIDAY_PACKS.map(pack => pack.price));
const summaries: Record<string, string> = {
  "bf-muscle-energy": "Whey, Cream of Rice, créatine, Vita CORE et Fitness File",
  "bf-premium-wellness": "Whey, collagène, biotine, vitamine D3 et consultation InBody 270",
  "bf-fitness-premium": "Cream of Rice, zinc, Milk Thistle et sauce pancake",
  "bf-fitness-sante": "Gainer Dynamix 6 kg, magnésium, zinc, oméga-3 et deux sauces",
  "bf-performance": "Créatine, ashwagandha, multivitamines, D3, sauce pancake et boisson ABE",
  "bf-performance-plus": "Cream of Rice, EAA, créatine 500 g, Vita CORE et deux sauces",
};

const faq = [
  {
    question: "Quel est le prix des packs Black Friday IRONZ ?",
    answer: `Les ${BLACK_FRIDAY_PACKS.length} packs présentés sur cette page vont de ${price(minimumPrice)} à ${price(maximumPrice)}. Le montant affiché correspond au lot complet. Chaque fiche détaille ses produits et son prix de référence.`,
  },
  {
    question: "Quels packs contiennent de la whey ?",
    answer: "Muscle & Energy et Premium Wellness comprennent une whey Hiro.Lab. Le premier associe notamment crème de riz et créatine ; le second comprend collagène, biotine et vitamine D3. Comparez leur contenu complet sur les fiches.",
  },
  {
    question: "Quel pack comprend le Mass Gainer Dynamix de 6 kg ?",
    answer: "Le Pack Fitness & Santé comprend le gainer Dynamix de 6 kg, du magnésium glycinate NOW, du zinc et des oméga-3 Hiro.Lab, ainsi que les sauces pancake et barbecue ServiVita.",
  },
  {
    question: "La livraison des packs est-elle offerte partout au Maroc ?",
    answer: "Oui. Les six offres Black Friday présentées comprennent la livraison gratuite partout au Maroc. Pour une question sur votre adresse ou l’organisation de votre commande, contactez IRONZ.",
  },
  {
    question: "Le scanner InBody 270 est-il vendu avec le pack ?",
    answer: "Le Pack Premium Wellness comprend une consultation InBody 270 et le Fitness File IRONZ. Le scanner représenté sur le dossier est une illustration de la consultation : l’appareil n’est pas vendu dans le pack.",
  },
  {
    question: "Comment vérifier les produits inclus avant de commander ?",
    answer: "Ouvrez « Contenu du pack » sur la carte, puis consultez la fiche du lot choisi. Vous y retrouvez la liste des références, les formats précisés, le prix et la réduction calculée. L’ajout au panier concerne le pack complet.",
  },
];

export default function BlackFridayContent() {
  const example = BLACK_FRIDAY_PACKS.find(pack => pack.id === "bf-fitness-sante")!;
  const savings = getBlackFridaySavings(example);
  const linkClass = "text-yellow-400 underline underline-offset-4 hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400";

  return (
    <section id="black-friday-guide" aria-labelledby="compare-packs" className="bg-[#111111] pb-16 text-zinc-300 sm:pb-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 id="compare-packs" className="font-display text-3xl uppercase text-white sm:text-4xl">Quel pack de nutrition sportive choisir pour le Black Friday ?</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7">Un pack de whey, un lot avec de la créatine et une offre de gainer ne réunissent pas les mêmes références. Pour choisir parmi les offres Black Friday IRONZ au Maroc, commencez par les produits que vous recherchez, puis comparez le contenu du lot et son prix. Ce récapitulatif permet de distinguer les six combinaisons.</p>

        <div role="region" aria-label="Comparatif des six packs Black Friday" tabIndex={0} className="mt-7 overflow-x-auto rounded-lg border border-white/15 focus-visible:outline-2 focus-visible:outline-yellow-400">
          <table className="w-full min-w-[580px] text-left text-sm">
            <caption className="sr-only">Contenu principal et prix actuels des packs Black Friday IRONZ, en dirhams.</caption>
            <thead className="bg-white/5 text-white"><tr><th scope="col" className="px-4 py-4 font-semibold sm:px-6">Pack</th><th scope="col" className="px-4 py-4 font-semibold sm:px-6">Produits principaux</th><th scope="col" className="whitespace-nowrap px-4 py-4 text-right font-semibold sm:px-6">Prix du lot</th></tr></thead>
            <tbody>{BLACK_FRIDAY_PACKS.map(pack => <tr key={pack.id} className="border-t border-white/10"><th scope="row" className="px-4 py-4 font-medium sm:px-6"><Link href={`/produit/${pack.slug}`} className={linkClass}>{pack.name}</Link></th><td className="px-4 py-4 leading-relaxed sm:px-6">{summaries[pack.id]}</td><td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-white sm:px-6">{price(pack.price)}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-8 text-sm leading-7 lg:grid-cols-2 lg:gap-x-14">
          <article><h3 className="font-display text-2xl uppercase text-white">Whey et collagène : deux packs à comparer</h3><p className="mt-4">Muscle & Energy réunit whey Hiro.Lab, créatine monohydrate BioTechUSA et Cream of Rice Applied Nutrition, avec Vita CORE FA et le Fitness File. Premium Wellness comprend également une whey, mais l’associe au collagène Hiro.Lab, à la biotine et à la vitamine D3 NOW. La consultation InBody 270 fait partie de cette seconde offre. Le choix repose donc sur les références que vous souhaitez retrouver dans votre commande.</p></article>
          <article><h3 className="font-display text-2xl uppercase text-white">Crème de riz ou gainer Dynamix 6 kg</h3><p className="mt-4">Fitness Premium rassemble Cream of Rice, zinc picolinate, Milk Thistle et sauce pancake. Fitness & Santé propose une autre composition, autour du gainer Dynamix de 6 kg, avec magnésium, zinc, oméga-3 et deux sauces. Si vous recherchez de la crème de riz avec des EAA et une créatine de 500 g, consultez aussi le Performance Pack.</p></article>
          <article><h3 className="font-display text-2xl uppercase text-white">Distinguer les deux packs Performance</h3><p className="mt-4">Les noms sont proches, mais les lots sont différents. Le Pack Performance comprend créatine BioTechUSA, ashwagandha Hiro.Lab, One-A-Day, vitamine D3, sauce pancake et boisson ABE. Le Performance Pack associe Cream of Rice, Hit EAA DY Nutrition, créatine BioTechUSA 500 g, Vita CORE FA et les sauces pancake et barbecue ServiVita. Vérifiez la liste complète sur chaque fiche avant de choisir.</p></article>
          <article><h3 className="font-display text-2xl uppercase text-white">Comparer les prix et les réductions réelles</h3><p className="mt-4">L’économie correspond à la différence entre le prix de référence barré et le prix du pack. Le pourcentage est calculé sur ce prix de référence, puis arrondi à deux décimales. Par exemple, {example.name} passe de {price(example.oldPrice)} à {price(example.price)}, soit {price(savings.amount)} d’économie et une réduction de {savings.percentageLabel} %. Comparez cette économie avec les produits réellement compris dans le lot.</p></article>
        </div>

        <section aria-labelledby="delivery-black-friday" className="mt-10 border-t border-white/15 pt-8">
          <h2 id="delivery-black-friday" className="font-display text-3xl uppercase text-white">Livraison des packs Black Friday au Maroc</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7">Les six packs de cette sélection bénéficient de la livraison offerte partout au Maroc. IRONZ dispose également d’un showroom au {SITE_ADDRESS.streetAddress}, à {SITE_ADDRESS.addressLocality}. Pour une précision sur le contenu d’un lot ou votre commande, <Link href="/contact" className={linkClass}>contactez IRONZ</Link>. Pour consulter les références proposées séparément, parcourez notre <Link href="/categories/supplement" className={linkClass}>catalogue de suppléments et nutrition sportive</Link>.</p>
        </section>

        <section aria-labelledby="faq-black-friday" className="mt-10 border-t border-white/15 pt-8">
          <h2 id="faq-black-friday" className="font-display text-3xl uppercase text-white">Questions sur les packs Black Friday</h2>
          <div className="mt-4 grid gap-x-12 lg:grid-cols-2">{faq.map(item => <details key={item.question} className="border-b border-white/15 py-4"><summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold leading-relaxed text-white focus-visible:outline-2 focus-visible:outline-yellow-400">{item.question}</summary><p className="pb-2 pt-2 text-sm leading-7">{item.answer}</p></details>)}</div>
        </section>
      </div>
    </section>
  );
}
