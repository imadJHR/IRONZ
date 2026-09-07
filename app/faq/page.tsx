import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Réponses aux questions fréquentes sur les produits et services IRONZ.",
};

const questions = [
  ["Livrez-vous partout au Maroc ?", "Oui, IRONZ assure la livraison dans les villes du Maroc selon la disponibilité des produits et les conditions logistiques."],
  ["Quels sont vos horaires ?", "Notre showroom et notre service client sont disponibles 7j/7 de 9h à 18h."],
  ["Proposez-vous l’installation des équipements ?", "Oui, nous proposons des solutions d’installation et d’aménagement adaptées aux particuliers et aux professionnels."],
  ["Comment demander un devis ?", "Utilisez notre formulaire de demande de devis en décrivant votre espace, vos besoins et votre budget."],
] as const;

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-24 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-10 font-display text-4xl uppercase tracking-wide sm:text-5xl">
          Questions <span className="text-yellow-500">fréquentes</span>
        </h1>
        <div className="space-y-5">
          {questions.map(([question, answer]) => (
            <article key={question} className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
              <h2 className="mb-3 text-lg font-bold">{question}</h2>
              <p className="leading-7 text-gray-700 dark:text-gray-300">{answer}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-gray-700 dark:text-gray-300">
          Vous n’avez pas trouvé votre réponse ?{" "}
          <Link href="/contact" className="font-bold text-yellow-600 hover:underline dark:text-yellow-400">Contactez-nous</Link>.
        </p>
      </section>
    </main>
  );
}
