import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d’utilisation et de vente du site IRONZ.",
};

export default function ConditionsPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-24 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Conditions <span className="text-yellow-500">générales</span>
        </h1>
        <div className="space-y-8 leading-7 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Produits et commandes</h2>
            <p>Les caractéristiques, prix et disponibilités sont présentés sur chaque fiche produit. Une commande est confirmée après validation des informations communiquées par le client.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Prix et paiement</h2>
            <p>Les prix sont indiqués en dirhams marocains. Les moyens de paiement disponibles sont précisés lors de la commande.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Livraison</h2>
            <p>Les délais dépendent du produit, du stock et de la destination. Les informations de livraison sont confirmées avec le client avant l’expédition.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Service client</h2>
            <p>Pour toute question relative à une commande, une livraison ou un produit, contactez IRONZ depuis la page Contact.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
