import Link from "next/link";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

export const metadata = {
  title:
    "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ? | IRONZ",
  description:
    "Tapis roulant, vélo ou rameur : quelles différences, quelles caractéristiques comparer et comment choisir selon votre espace avant d'acheter au Maroc.",
  alternates: {
    canonical: "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title:
      "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ? | IRONZ",
    description:
      "Tapis roulant, vélo ou rameur : quelles différences, quelles caractéristiques comparer et comment choisir selon votre espace avant d'acheter au Maroc.",
    url: "https://www.ironz.ma/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
    type: "article",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ? | IRONZ",
    description:
      "Tapis roulant, vélo ou rameur : quelles différences, quelles caractéristiques comparer et comment choisir selon votre espace avant d'acheter au Maroc.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

const PAGE_URL =
  "https://www.ironz.ma/guides/choisir-machine-cardio-tapis-velo-rameur-maroc";

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
        name: "Machines cardio",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ?",
    description:
      "Tapis roulant, vélo ou rameur : quelles différences, quelles caractéristiques comparer et comment choisir selon votre espace avant d'acheter au Maroc.",
    publisher: {
      "@type": "Organization",
      name: "IRONZ",
      logo: { "@type": "ImageObject", url: "https://www.ironz.ma/logo-optimized.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  },
];

export default function GuideChoixMachineCardio() {
  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav aria-label="Fil d'Ariane" className="mb-10">
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
          <li className="font-medium text-gray-900 dark:text-white">Machines cardio</li>
        </ol>
      </nav>

      <h1 className="mb-8 font-display text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
        Tapis roulant, vélo ou rameur : quelle machine cardio choisir au Maroc ?
      </h1>

      <p className="mb-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        Avant de comparer des modèles, il faut choisir une famille. Un tapis
        roulant, un vélo et un rameur ne se pratiquent pas de la même façon, ne
        demandent pas le même espace, ni les mêmes vérifications. Ce guide
        présente les différences concrètes entre les trois et les caractéristiques
        à comparer pour choisir celle qui correspond à votre entraînement et à
        votre pièce.
      </p>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Tapis, vélo et rameur : comment ils fonctionnent et ce qui change
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          Les trois familles font travailler l'endurance, mais le mouvement, la
          position du corps et l'empreinte au sol ne sont pas les mêmes.
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Le tapis roulant</strong> — on marche ou on court, en position
            debout, sur une bande qui défile. La pratique dépend de la longueur
            et de la largeur de la zone de course, ainsi que de la vitesse
            maximale. Le modèle référencé chez IRONZ est pliable, ce qui change
            la donne pour un usage à domicile.
          </li>
          <li>
            <strong>Le vélo</strong> — on pédale en position assise. IRONZ
            référence aujourd'hui quatre formats clairement différents : le vélo
            droit, le vélo de spinning (position penchée vers l'avant, guidon
            rapproché), le vélo semi-allongé et le vélo horizontal, tous deux
            avec siège et dossier. Le mouvement de pédalage est commun, mais la
            position, le maintien et l'encombrement changent selon le format.
          </li>
          <li>
            <strong>Le rameur</strong> — on tire, assis, en coordonnant bras et
            jambes sur un mouvement complet. Contrairement au tapis et au vélo,
            il faut un dégagement libre devant et derrière la machine pour que le
            mouvement puisse s'effectuer sans obstacle.
          </li>
        </ul>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 pr-4 font-bold text-gray-900 dark:text-white">Machine</th>
                <th className="py-3 pr-4 font-bold text-gray-900 dark:text-white">Mouvement</th>
                <th className="py-3 pr-4 font-bold text-gray-900 dark:text-white">Position</th>
                <th className="py-3 pr-4 font-bold text-gray-900 dark:text-white">Espace</th>
                <th className="py-3 font-bold text-gray-900 dark:text-white">À vérifier sur la fiche</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">Tapis roulant</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Marche, course</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Debout</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Empreinte longue ; modèle pliable référencé</td>
                <td className="py-3 text-gray-600 dark:text-gray-400">Zone de course, vitesse, poids maximal, dimensions</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">Vélo</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Pédalage</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Assis ; penché en avant en spinning, avec dossier en semi-allongé et horizontal</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Empreinte plus contenue que déployée</td>
                <td className="py-3 text-gray-600 dark:text-gray-400">Format, dimensions, volant d'inertie, résistance, console</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">Rameur</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Tirage assis, bras et jambes</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Assis au ras du sol</td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">Dégagement libre devant et derrière</td>
                <td className="py-3 text-gray-600 dark:text-gray-400">Dimensions, poids maximal, résistance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Quelle machine cardio selon votre espace ?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          L'espace disponible est souvent le premier critère réel. Mesurez
          l'emplacement prévu, en longueur, largeur et hauteur, avant de comparer
          les familles :
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Un tapis déployé est long.</strong> La zone de course du
            modèle référencé mesure 400 × 1020 mm, et il faut y ajouter l'espace
            autour pour monter et descendre en sécurité. Si la pièce est petite,
            un tapis pliable comme celui référencé chez IRONZ — 630 × 710 × 1280
            mm une fois plié — se range contre un mur entre deux séances.
          </li>
          <li>
            <strong>Le vélo reste le plus compact des trois.</strong> Les formats
            avec dossier sont un peu plus longs qu'un vélo droit, mais aucun ne
            demande le dégagement d'un tapis déployé. Le vélo de spinning
            référencé occupe 1005 × 485 × 1160 mm, à titre de comparaison.
          </li>
          <li>
            <strong>Le rameur ne se range pas contre un mur pendant la séance.</strong>
            Le mouvement de tirage nécessite de garder l'espace libre devant et
            derrière. Vérifiez les dimensions et le dégagement nécessaires sur la
            fiche avant de prévoir l'emplacement.
          </li>
          <li>
            <strong>Pensez aussi au sol et aux passages.</strong> Le poids de
            l'appareil, le revêtement et la largeur des portes comptent autant que
            la surface. Si vous aménagez une pièce dédiée, {" "}
            <Link
              href="/services/amenagement-salle/home-gym"
              className="font-medium text-yellow-600 underline-offset-4 hover:underline dark:text-yellow-400"
            >
              notre service d'aménagement de home gym
            </Link>{" "}
            peut vous aider à prévoir l'espace avant l'achat.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Quelle machine cardio selon votre entraînement ?
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Aucune famille n'est supérieure à une autre : elles correspondent à des
          usages différents. Posez-vous les bonnes questions :
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Marche et course ou pas ?</strong> Si vous aimez marcher ou
            courir, seul le tapis reproduit ce mouvement, avec la vitesse qui
            s'ajuste. Le modèle référencé monte de 1 à 13 km/h, ce qui couvre la
            marche rapide jusqu'au footing.
          </li>
          <li>
            <strong>Position assise ou debout ?</strong> Le vélo et le rameur se
            pratiquent assis. Entre les formats de vélo, le spinning est penché
            vers l'avant, tandis que les formats semi-allongé et horizontal
            ajoutent un dossier. Le choix se fait par préférence de position, pas
            par performance.
          </li>
          <li>
            <strong>Mouvement complet ou simple ?</strong> Le rameur enchaîne tirage
            des bras et poussée des jambes, là où le vélo sollicite surtout le
            bas du corps et le tapis la marche ou la course. Le catalogue IRONZ
            décrit le rameur comme un entraînement cardio complet pour la maison
            ou la salle.
          </li>
          <li>
            <strong>Programmes et résistance.</strong> Selon les modèles, le
            catalogue documente des résistances magnétiques à cinq niveaux comme
            des résistances électroniques à vingt-quatre niveaux, des volants
            d'inertie de 8 et 9 kg, et des programmes prédéfinis. Si vous aimez
            structurer vos séances, comparez ces caractéristiques avant de
            choisir.
          </li>
          <li>
            <strong>Fréquence et silence.</strong> Pour un usage quotidien en
            appartement, le bruit et l'encombrement comptent autant que la
            machine elle-même. Les fiches indiquent les caractéristiques
            documentées par le fabricant, y compris le système de résistance,
            à comparer avant l'achat.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Les caractéristiques à comparer avant d'acheter
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Sur les fiches produits IRONZ, ces informations sont indiquées et
          doivent être vérifiées avant l'achat :
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>La vitesse maximale (tapis).</strong> Elle définit ce que vous
            pourrez faire : 1 à 13 km/h couvre la marche jusqu'au footing, mais
            pas un sprint. Le modèle référencé annonce cette plage.
          </li>
          <li>
            <strong>La zone de course (tapis).</strong> Sa longueur et sa largeur
            doivent correspondre à votre foulée. Le modèle référencé affiche une
            zone de 400 × 1020 mm.
          </li>
          <li>
            <strong>Le poids maximal supporté.</strong> Il est documenté sur
            certaines fiches : 110 kg pour le tapis référencé, 150 kg pour le vélo
            de spinning référencé. Vérifiez-le systématiquement, y compris sur les
            références où il n'apparaît pas.
          </li>
          <li>
            <strong>Le volant d'inertie et la résistance (vélos).</strong> Ils
            déterminent la fluidité et la plage d'intensité. Le catalogue documente
            des volants de 8 et 9 kg, des résistances magnétiques à cinq niveaux et
            électroniques à vingt-quatre niveaux.
          </li>
          <li>
            <strong>Les dimensions et le pliage.</strong> C'est le critère numéro
            un pour un usage à domicile. Comparez les dimensions déployées et, si
            la machine est pliable, les dimensions repliées.
          </li>
          <li>
            <strong>La console et les affichages.</strong> Selon les modèles, les
            écrans affichent le temps, la vitesse, la distance, et parfois la
            fréquence cardiaque et la puissance. Choisissez selon les informations
            qui vous sont utiles.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Vérifier la fiche avant l'achat
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
          Chaque fiche produit indique les caractéristiques fournies par le
            fabricant. Avant de commander :
        </p>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Relevez les dimensions réelles</strong> de la machine et
            comparez-les à votre pièce, en tenant compte des espaces de
            circulation et des dégagements nécessaires au mouvement.
          </li>
          <li>
            <strong>Vérifiez le poids maximal supporté</strong> s'il est documenté,
            et les caractéristiques de résistance ou de programmes si elles
            comptent pour vos séances.
          </li>
          <li>
            <strong>Contrôlez la disponibilité indiquée</strong> sur la fiche le
            jour de la commande : les références et les stocks évoluent, et toutes
            les machines ne sont pas disponibles en permanence.
          </li>
          <li>
            <strong>Pour un projet de salle</strong> — domicile ou professionnel —
            demandez un devis avant de valider un équipement, afin de vérifier la
            disponibilité et l'installation.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Les erreurs à éviter avant d'acheter
        </h2>
        <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            <strong>Acheter sans avoir mesuré.</strong> C'est l'erreur la plus
            fréquente : on compare les machines avant de comparer les mètres. Un
            tapis déployé ou un rameur en mouvement prend plus de place que la
            fiche ne le laisse imaginer.
          </li>
          <li>
            <strong>Confondre les formats de vélo.</strong> Un vélo droit, un
            spinning, un semi-allongé et un horizontal ne se remplacent pas : la
            position et le maintien changent, et l'encombrement aussi.
          </li>
          <li>
            <strong>Ignorer le poids maximal supporté.</strong> Quand il est
            documenté, il fait partie des caractéristiques à vérifier comme les
            dimensions — pas à deviner.
          </li>
          <li>
            <strong>Choisir uniquement sur la vitesse ou les programmes.</strong>
            Une machine trop grande pour la pièce ne sert pas, quelles que soient
            ses fonctions.
          </li>
          <li>
            <strong>Oublier les dégagements.</strong> Un rameur a besoin d'espace
            libre devant et derrière, un tapis d'espace pour monter et descendre.
          </li>
          <li>
            <strong>Ne pas vérifier la fiche au moment de la commande.</strong>
            Caractéristiques et disponibilités évoluent : ce qui était documenté à
            la lecture du guide doit être confirmé sur la fiche avant l'achat.
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Voir les machines cardio disponibles chez IRONZ
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
          IRONZ référence actuellement un tapis roulant, quatre formats de vélos
          et un rameur. Les fiches détaillent dimensions, poids maximal, résistance
          et console selon les modèles : comparez-les à votre espace avant de
          décider.
        </p>
        <Link
          href="/categories/equipements/machine-de-fitness"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-black transition-all hover:bg-yellow-500"
        >
          Voir les machines cardio disponibles chez IRONZ
        </Link>
      </section>
    </article>
  );
}
