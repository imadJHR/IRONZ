import Link from "next/link";

const guides = [
  {
    title: "Comment choisir ses haltères, kettlebells et disques au Maroc ?",
    description:
      "Différences entre haltères, kettlebells et disques, comment choisir le poids adapté à votre entraînement et éviter les mauvais achats.",
    href: "/guides/choisir-halteres-kettlebells-disques-maroc",
  },
  {
    title:
      "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ?",
    description:
      "Différences entre tapis roulant, vélos et rameur, comment choisir selon votre espace et les caractéristiques à comparer avant d'acheter.",
    href: "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
  },
];

export default function GuidesIndexPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="mb-8 font-display text-4xl uppercase tracking-wide sm:text-5xl">
        Guides fitness et musculation au Maroc
      </h1>
      <p className="mb-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        IRONZ publie des guides pratiques pour vous aider à choisir votre matériel de
        fitness et de musculation au Maroc : ce qui change d’un équipement à l’autre,
        comment choisir en fonction de votre entraînement et de votre espace, et les
        erreurs à éviter avant d’acheter.
      </p>
      <div className="space-y-5">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block rounded-2xl border border-gray-200 p-6 transition-all hover:border-yellow-500 dark:border-gray-800"
          >
            <h2 className="mb-3 text-lg font-bold">{guide.title}</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
