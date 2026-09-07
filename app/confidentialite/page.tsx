import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des données d’IRONZ.",
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-24 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6">
      <article className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Politique de <span className="text-yellow-500">confidentialité</span>
        </h1>
        <div className="space-y-8 leading-7 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Données collectées</h2>
            <p>IRONZ collecte uniquement les informations nécessaires au traitement des commandes, des demandes de devis et des messages envoyés depuis le site.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Utilisation des données</h2>
            <p>Ces informations sont utilisées pour répondre à vos demandes, assurer le suivi commercial, organiser la livraison et améliorer nos services. Elles ne sont pas vendues à des tiers.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Conservation et sécurité</h2>
            <p>Les données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été recueillies et sont protégées par des mesures techniques et organisationnelles adaptées.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">Vos droits</h2>
            <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données en utilisant les coordonnées disponibles sur la page Contact.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
