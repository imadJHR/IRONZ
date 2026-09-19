import Link from "next/link";

export const metadata = {
  title: "Comment choisir ses haltères, kettlebells et disques au Maroc ? | IRONZ",
  description:
    "Haltères, kettlebells ou disques : quelles différences, comment choisir le poids adapté à votre entraînement et éviter les mauvais achats.",
  alternates: { canonical: "/guides/choisir-halteres-kettlebells-disques-maroc" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Comment choisir ses haltères, kettlebells et disques au Maroc ? | IRONZ",
    description:
      "Haltères, kettlebells ou disques : quelles différences, comment choisir le poids adapté à votre entraînement et éviter les mauvais achats.",
    url: "https://www.ironz.ma/guides/choisir-halteres-kettlebells-disques-maroc",
    type: "article",
  },
};

const PAGE_URL = "https://www.ironz.ma/guides/choisir-halteres-kettlebells-disques-maroc";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.ironz.ma/guides" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Comment choisir ses haltères, kettlebells et disques",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Comment choisir ses haltères, kettlebells et disques au Maroc ?",
    description:
      "Haltères, kettlebells ou disques : quelles différences, comment choisir le poids adapté à votre entraînement et éviter les mauvais achats.",
    publisher: {
      "@type": "Organization",
      name: "IRONZ",
      logo: { "@type": "ImageObject", url: "https://www.ironz.ma/logo-optimized.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  },
];

export default function GuideChoixPoidsLibres() {
  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav aria-label="Fil d’Ariane" className="mb-10">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>
            <Link href="/guides" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="font-medium text-gray-900 dark:text-white">Haltères, kettlebells et disques</li>
        </ol>
      </nav>

      <h1 className="mb-8 font-display text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
        Comment choisir ses haltères, kettlebells et disques au Maroc ?
      </h1>

      <p className="mb-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Avant d’acheter du matériel de musculation, mieux vaut savoir ce que l’on peut
        réellement en faire. Les haltères, kettlebells et disques servent tous à
        résister à un mouvement, mais leur prise, leur répartition du poids et leur
        usage diffèrent. Ce guide explique comment les distinguer et comment choisir en
        fonction de votre entraînement, de votre niveau et de votre espace — pas en
        fonction d’une règle universelle.
      </p>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Haltères, kettlebells et disques : quelles différences ?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          La différence ne se joue pas sur le poids, mais sur la <strong>prise</strong> et
          la <strong>répartition de la charge</strong> — deux choses qui changent les
          exercices possibles.
        </p>
        <ul className="space-y-4">
          <li className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
            <h3 className="mb-2 font-bold">
              L’haltère : la charge équilibrée de chaque côté
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Prise en main centrale, poids réparti à gauche et à droite. C’est l’outil
              le plus polyvalent : développés, tirages, curls, squats, travail unilatéral.
              On peut l’utiliser debout, assis, au sol, et il reste stable quand on le
              pose. C’est le point de départ le plus logique pour la plupart des gens.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
            <h3 className="mb-2 font-bold">
              La kettlebell : la masse décalée pour les mouvements fonctionnels
            </h3>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Poignée au-dessus d’une masse décalée. Ce déséquilibre force la prise, le
              gainage et la coordination. Elle brille sur les mouvements balistiques
              (swing, arraché) et le travail de force préhensive — là où l’haltère est
              moins naturel. Sa prise large permet aussi de la saisir à deux mains.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
            <h3 className="mb-2 font-bold">
              Le disque : la charge à combiner avec une barre
            </h3>
            <p className="mb-2 leading-relaxed text-gray-700 dark:text-gray-300">
              Seul, un disque ne sert à presque rien. Sa raison d’être est d’être
              enfilé sur une barre pour augmenter la résistance sur des exercices où les
              deux mains travaillent ensemble (soulevé de terre, squat, développé).
              C’est un investissement pour une pratique régulière avec une barre.
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              <strong>Important :</strong> les disques existent en plusieurs diamètres.
              Vérifiez le diamètre du fut de votre barre avant tout achat — un disque
              incompatible ne se montera tout simplement pas.
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Comment choisir ses haltères ?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Trois questions pratiques, dans l’ordre :
        </p>
        <ol className="ml-6 list-decimal space-y-3 leading-relaxed text-gray-700 marker:font-bold marker:text-yellow-600 dark:text-gray-300 dark:marker:text-yellow-400">
          <li>
            <strong>Fixes ou à charge répartie ?</strong> Les haltères fixes s’utilisent
            tels quels, sans montage. Si vous voulez progresser en charge, les disques
            coulissants sur une barre courte sont plus évolutifs — mais ils demandent
            de posséder ou d’acheter des disques.
          </li>
          <li>
            <strong>Polyvalence d’abord.</strong> Si vous ne prenez qu’un seul matériel,
            prenez une paire d’haltères. Ils couvrent la majorité des exercices debout,
            assis et au sol, et restent utilisables même si votre programme change.
          </li>
          <li>
            <strong>Poids de départ.</strong> Voyez la section « Quel poids choisir ? »
            plus bas : il n’y a pas de chiffre universel, mais une logique à appliquer
            à votre cas.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Comment choisir une kettlebell ?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          La kettlebell ne remplace pas l’haltère, elle le complète. Elle devient
          pertinente si votre entraînement inclut des mouvements balistiques ou de la
          force préhensive. Deux critères :
        </p>
        <ul className="ml-6 list-disc space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>La prise en main.</strong> Saisissez la poignée : si vos doigts ne
            passent pas confortablement ou si la kettlebell cogne sur l’avant-bras au
            mouvement, la taille ou la forme ne vous convient pas. La prise prime sur le
            poids.
          </li>
          <li>
            <strong>La progression par paliers.</strong> Une kettlebell ne s’augmente
            pas par petits incréments comme une barre : on saute souvent à la taille
            suivante. C’est un argument pour viser une charge que vous maîtrisez plutôt
            qu’un poids maximal.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Concrètement, IRONZ liste aujourd’hui des kettlebells à{" "}
          <strong>10 kg, 12 kg, 14 kg et 16 kg</strong>. Ce sont des paliers à choisir
          selon l’exercice et votre niveau — aucun n’est un « bon poids pour tout le
          monde ».
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Comment choisir ses disques de musculation ?
        </h2>
        <ul className="ml-6 list-disc space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Le diamètre, avant tout.</strong> C’est le critère bloquant. Un
            disque dont le trou ne correspond pas au diamètre de votre barre ne se monte
            pas. Mesurez le fut avant d’acheter.
          </li>
          <li>
            <strong>Les petits disques pour progresser.</strong> Les disques de faible
            charge sont ceux qui rendent service le plus longtemps : ils permettent
            d’augmenter progressivement. Les gros disques servent quand vous atteignez
            déjà des charges importantes.
          </li>
          <li>
            <strong>Pourquoi 50 mm ?</strong> Les disques de 50 mm de diamètre sont la
            dimension des barres dites olympiques, que l’on trouve en salle et chez les
            pratiquants avancés. C’est un standard répandu, pas un label de qualité — un
            disque olympique ne sera pas meilleur s’il ne va pas sur votre barre.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Côté catalogue IRONZ : disques à <strong>10 kg et 20 kg</strong> et{" "}
          <strong>disques olympiques 50 mm</strong>. Les disques olympiques 50 mm
          existent aussi en 10 kg : un disque de faible charge reste utile, car
          c’est lui qui permet d’augmenter peu à peu.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Quel poids choisir ?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Il n’existe pas de poids « pour débutant » ou « pour femme » valable pour
          tout le monde. La charge adaptée dépend de facteurs concrets :
        </p>
        <ul className="ml-6 list-disc space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
          <li><strong>L’exercice</strong> — un même pratiquant n’utilise pas la même charge pour un curl que pour un soulevé de terre.</li>
          <li><strong>Votre force actuelle</strong> — pas votre objectif, ni votre morphologie.</li>
          <li><strong>Votre technique</strong> — un mouvement maîtrisé supporte plus de charge qu’un mouvement à apprendre.</li>
          <li><strong>Votre expérience</strong> — un pratiquant régulier connaît ses charges de référence.</li>
          <li><strong>Le contrôle des répétitions</strong> — la bonne charge est celle que vous tenez sur tout le set, sans triche ni perte d’équilibre.</li>
        </ul>
        <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
          En pratique : commencez par la charge que vous contrôlez sur l’intégralité de
          vos répétitions, puis progressez. C’est pour cette raison qu’il est plus
          utile d’avoir plusieurs paliers disponibles que d’acheter une seule charge
          lourde. À titre d’exemple, les haltères IRONZ actuels couvrent{" "}
          <strong>12,5 kg à 40 kg</strong> — une plage pensée pour cette progression,
          avec aussi des haltères PVC légers pour le travail unilatéral.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Quel équipement selon votre espace et votre entraînement ?
        </h2>
        <ul className="ml-6 list-disc space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Espace réduit ou entraînement debout uniquement :</strong> une paire
            d’haltères couvre l’essentiel. Ils se rangent au sol, ne nécessitent pas de
            rack et restent utilisables même si vous déménagez.
          </li>
          <li>
            <strong>Travail fonctionnel, gainage et mouvements balistiques :</strong> la
            kettlebell complète logiquement les haltères.
          </li>
          <li>
            <strong>Objectif force avec charges importantes :</strong> une barre avec
            disques devient plus adaptée que des haltères très lourds, notamment pour les
            exercices à deux mains.
          </li>
          <li>
            <strong>Si vous ne savez pas encore :</strong> privilégiez les haltères, qui
            resteront utiles quel que soit le programme que vous adoptez ensuite.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Les erreurs à éviter avant d’acheter
        </h2>
        <ul className="ml-6 list-disc space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
          <li><strong>Acheter trop lourd pour progresser « plus vite ».</strong> Une charge non maîtrisée n’accélère rien et s’use en coin.</li>
          <li><strong>Prendre des disques sans vérifier le diamètre de la barre.</strong> C’est la cause la plus fréquente d’achat inutilisable.</li>
          <li><strong>Multiplier les kettlebells dès le départ.</strong> Une seule kettlebell bien choisie suffit avant d’investir dans un second palier.</li>
          <li><strong>Oublier la poignée.</strong> Une prise inconfortable ou qui cogne l’avant-bras rend une kettlebell inutile, même au bon poids.</li>
          <li><strong>Surcharger un petit espace.</strong> Une barre chargée demande de la place pour être manipulée en sécurité — mesurez avant.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Voir les poids libres disponibles chez IRONZ
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Vous pouvez comparer les charges et familles disponibles dans le catalogue
          poids libres, et trouver les accessoires de tirage qui complètent un
          équipement de force.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/categories/accessoires/poids-libres"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 font-display uppercase tracking-widest text-black transition-all hover:bg-yellow-400"
          >
            Voir les poids libres disponibles
          </Link>
          <Link
            href="/categories/accessoires/accessoires-de-musculation"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-4 font-display uppercase tracking-widest text-gray-900 transition-all hover:border-yellow-500 dark:border-gray-700 dark:text-white"
          >
            Voir les accessoires de musculation
          </Link>
        </div>
      </section>
    </article>
  );
}
