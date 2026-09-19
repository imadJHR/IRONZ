import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides fitness et musculation au Maroc | IRONZ",
  description:
    "Guides d’achat fitness et musculation IRONZ : comment choisir vos haltères, kettlebells, disques, machines et accessoires au Maroc.",
  alternates: { canonical: "/guides" },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white px-4 py-24 text-gray-900 dark:bg-gray-950 dark:text-white sm:px-6">
      <nav aria-label="Fil d’Ariane" className="mx-auto mb-10 max-w-3xl">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="font-medium text-gray-900 dark:text-white">Guides</li>
        </ol>
      </nav>
      {children}
    </main>
  );
}
