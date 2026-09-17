import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProductsClient from "../CategoryProductsClient";
import type { Product } from "../CategoryProductsClient";
import { getAllProducts, productSlug } from "../../../../lib/products";
import {
  findTaxonomySubcategory,
  productMatchesSubcategory,
} from "../../../../lib/category-taxonomy";

const SITE_URL = "https://www.ironz.ma";

const SUBCATEGORY_SEO: Record<
  string,
  { title: string; description: string; heading: string; intro: string }
> = {
  "equipements/machine-de-fitness": {
    title: "Machines de fitness : cardio et musculation | IRONZ",
    description:
      "Comparez vélos, rameur, tapis roulant, presse à jambes, rack, banc et Reformer Pilates chez IRONZ pour choisir votre matériel d'entraînement.",
    heading: "Machines de fitness, bancs et stations",
    intro:
      "Vélos d'appartement, rameur et tapis roulant côtoient ici les appareils de musculation, dont une presse à jambes, un leg curl, un rack multifonction et une station Home Gym. Le rayon comprend aussi un banc Adidas, un Reformer Pilates et un pack fitness pour la maison. Pour choisir votre matériel, partez des exercices souhaités et de l'espace disponible, puis vérifiez les dimensions et caractéristiques de la référence qui vous intéresse. Chaque fiche permet d'examiner un appareil précis avant votre achat.",
  },
  "accessoires/accessoires-de-fitness": {
    title: "Accessoires fitness : tapis, bandes et steps | IRONZ",
    description:
      "Tapis de yoga, bandes de résistance, steps, cordes à sauter et ballons : retrouvez les accessoires pour vos séances de fitness chez IRONZ.",
    heading: "Accessoires pour vos séances de fitness",
    intro:
      "Organisez vos séances avec du petit matériel : tapis de yoga, bandes élastiques, steps, cordes à sauter et ballon de fitness. Des poignées pour pompes, un hand grip et un rouleau en mousse complètent ce rayon, aux côtés de bandes de maintien et de sacs de sport. Choisissez vos accessoires selon les exercices prévus et consultez les indications de chaque fiche pour les formats ou résistances proposés. Vous pouvez ainsi réunir le matériel utile à votre routine sans parcourir les machines de cardio ou les poids libres.",
  },
  "accessoires/accessoires-de-boxe": {
    title: "Boxe : sacs de frappe, gants et protections au Maroc | IRONZ",
    description:
      "Sacs de frappe, gants, bandes, paos et protections : parcourez les accessoires de boxe IRONZ au Maroc pour préparer vos entraînements.",
    heading: "Sacs de frappe et accessoires de boxe",
    intro:
      "Le travail de frappe et les exercices à deux demandent des accessoires différents. Ce rayon réunit sacs de frappe, gants, bandes de boxe, paos, pads et cibles, ainsi qu'un plastron et des bâtons d'esquive. Vous y trouverez également des protège-tibias, dont un modèle enfant, et un protège-dents. Comparez les dimensions et les indications propres à chaque référence pour choisir le matériel correspondant à votre pratique. Les fiches IRONZ présentent les produits séparément pour préparer votre équipement de boxe au Maroc.",
  },
  "accessoires/poids-libres": {
    title: "Haltères, kettlebells et disques au Maroc | IRONZ",
    description:
      "Parcourez les haltères IRONBULL, haltères PVC, kettlebells et disques de musculation chez IRONZ. Comparez les charges proposées pour vos exercices.",
    heading: "Haltères, kettlebells et disques de musculation",
    intro:
      "Choisissez vos poids libres selon la charge et le type de prise recherchés. Cette page rassemble des haltères IRONBULL, des haltères PVC, des kettlebells et des disques de musculation, dont des disques olympiques. Plusieurs charges sont proposées dans ces familles ; ouvrez chaque fiche pour vérifier le poids annoncé, le conditionnement et les caractéristiques disponibles. Pour les disques, contrôlez aussi la compatibilité avec votre barre. Le rayon permet de comparer directement ces références IRONZ pour compléter votre matériel de musculation au Maroc.",
  },
  "accessoires/accessoires-de-musculation": {
    title: "Accessoires de musculation : barres et cordes | IRONZ",
    description:
      "Cordes triceps, barre de tirage, poignée de prise, barres de musculation et de traction : choisissez vos accessoires de musculation chez IRONZ.",
    heading: "Barres, poignées et cordes de musculation",
    intro:
      "Retrouvez les accessoires qui complètent vos exercices de tirage et de musculation : cordes triceps, barre de tirage et poignée de prise en croix. Le rayon comprend également des barres de musculation, des barres de traction et une référence de charges de 5 kg. Avant de choisir, consultez la longueur, la fixation et les caractéristiques renseignées sur chaque fiche afin de vérifier la compatibilité avec votre installation. Cette sélection se concentre sur les accessoires de travail, distincts des machines complètes et du rayon haltères et kettlebells.",
  },
  "supplement/healthy-products": {
    title: "Crème de riz, sauces et sirops | IRONZ",
    description:
      "Crème de riz Applied Nutrition, sauces ServiVita et sirop Vitadulce : retrouvez les produits du rayon Healthy Products chez IRONZ au Maroc.",
    heading: "Crème de riz, sauces et sirops",
    intro:
      "Le rayon Healthy Products rassemble ici de la crème de riz Applied Nutrition, une sauce barbecue, une sauce chocolat et un sirop pour pancakes ServiVita, ainsi qu'un sirop de chocolat Vitadulce. Ces références permettent de choisir une préparation à base de riz ou un accompagnement pour vos recettes. Consultez la composition, les valeurs nutritionnelles et les indications disponibles sur chaque fiche avant votre achat. Le nom du rayon ne remplace pas la lecture des informations propres à chaque produit, notamment en cas de besoin alimentaire particulier.",
  },
  /* STEP 5.2C — medium-priority subcategory pages */
  "accessoires/packs-promo": {
    title: "Packs Promo : bundles musculation, boxe, fitness | IRONZ Maroc",
    description:
      "Packs d'accessoires complémentaires chez IRONZ : sets musculation (haltères, gants, sangle), packs boxe (gants, protège-dents) et kits fitness (tapis, ballon, kettlebell).",
    heading: "Packs Promo d'accessoires",
    intro:
      "Ces packs regroupent des accessoires complémentaires pour démarrer ou enrichir votre routine : sets de musculation avec haltères et sangle de poignet, packs de boxe avec gants et protège-dents, et kits fitness avec tapis de yoga, ballon et kettlebell. Parcourez chaque référence pour vérifier le contenu et les écarts de prix du moment.",
  },
  "accessoires/vetements": {
    title: "Vêtements de sport et boxe : shorts, débardeurs | IRONZ Maroc",
    description:
      "Shorts de boxe, débardeurs thermiques et ensembles compétition : vêtements techniques pour fitness, boxe et bodybuilding chez IRONZ.",
    heading: "Vêtements de sport et de boxe",
    intro:
      "Ce rayon rassemble les vêtements d'entraînement : shorts de boxe en tissu respirant, ensembles compétition avec débardeur et short, shorts de bodybuilding et débardeurs thermiques. Parcourez les références pour choisir l'équipement de sport qui respecte vos mouvements et votre pratique, du fitness à la compétition.",
  },
  "accessoires/accessoires-des-machines": {
    title: "Accessoires machines musculation : poignées, triangles, poupies | IRONZ",
    description:
      "Poignées MAG GRIP, triangle de tirage dos et poulie 120 mm pour machine multiposte : accessoires haut du corps chez IRONZ au Maroc.",
    heading: "Accessoires pour machines de musculation",
    intro:
      "Ce rayon propose des accessoires conçus pour les machines de musculation et les câbles : les poignées MAG GRIP pour des prises multiples, un triangle de tirage pour cibler le dos, et une poulie de 120 mm compatible avec les multipostes. Ouvrez chaque fiche pour vérifier les dimensions et la compatibilité avec votre installation.",
  },
  "supplement/sauces-healthy": {
    title: "Sauces Healthy ServiVita : 0% sucre, barbecue et sirop | IRONZ Maroc",
    description:
      "Sauces ServiVita sans sucre ni matières grasses (barbecue, chocolat, sirop pour pancakes) et packs de sauces healthy chez IRONZ.",
    heading: "Sauces Healthy et sirops ServiVita",
    intro:
      "Ce rayon propose des sauces ServiVita sans sucre ni matières grasses : une sauce barbecue fumée, une sauce chocolat, un sirop pour pancakes, ainsi qu'un pack combinant sauce barbecue et vinaigre de cidre. Idéales pour adoucir vos préparations culinaires tout en limitant les sucres ajoutés. Consultez la composition de chaque référence avant usage.",
  },
  "supplement/whey-protein": {
    title: "Whey Protein Instant : protéine lactosérum 21 g | IRONZ Maroc",
    description:
      "Hiro.Lab Whey, whey protein instantané avec 21 g de protéines par portion, plusieurs saveurs. Récupération musculaire au Maroc.",
    heading: "Whey Protein Instant",
    intro:
      "Cette page présente le whey protein instantané Hiro.Lab, apportant 21 g de protéines de lactosérum par portion. Plusieurs saveurs disponibles (fraises, chocolat, vanille, caramel et cookies). À prendre autour des séances ou en cours de journée pour soutenir la récupération et le maintien de la masse musculaire.",
  },
  "supplement/whey-protein-isolate": {
    title: "Whey Protein Isolate : 28 g protéines, formule hydrolysée | IRONZ Maroc",
    description:
      "Beverly Hydrolyzed Professional, whey protein isolate hydrolysée avec 28 g de protéines par portion. Récupération rapide après l'entraînement.",
    heading: "Whey Protein Isolate Hydrolyzé",
    intro:
      "Le whey protein isolate présenté ici est une formule hydrolysée à base de protéines de lactosérum isolées, avec 28 g de protéines par portion. Sa digestion rapide en fait un complément idéal après l'entraînement pour le développement musculaire et la récupération.",
  },
  "supplement/mass-gainer": {
    title: "Mass Gainer : prise de masse avec créatine | IRONZ Maroc",
    description:
      "Dynamix Massive Mass Gainer 6 KG, combinaison de protéines, glucides et créatine pour un apport calorique élevé.",
    heading: "Mass Gainer pour la prise de masse",
    intro:
      "Ce mass gainer allie protéines, glucides complexes et créatine pour favoriser un apport calorique élevé lors des phases de prise de masse. Le format de 6 kg permet de couvrir plusieurs semaines d'entraînement intensif. À consommer selon les recommandations du packaging.",
  },
  "supplement/vitamines-mineraux": {
    title: "Compléments Vitamines & Minéraux : Zinc Picolinate | IRONZ Maroc",
    description:
      "Zinc picolinate 50 mg en 120 gélules – complément de minéraux pour le système immunitaire et la protection cellulaire.",
    heading: "Vitamines & Minéraux",
    intro:
      "Ce rayon présente les compléments de vitamines et minéraux individuels. Vous y trouverez du zinc picolinate à 50 mg sous forme de 120 gélules, un minéral essentiel pour le fonctionnement du système immunitaire et la protection des cellules. Consultez la notice avant utilisation.",
  },
  "supplement/multivitamines-mineraux": {
    title: "Multivitamines & Minéraux : Opti-Men 90 comprimés | IRONZ Maroc",
    description:
      "Optimum Nutrition Opti-Men, complexe multivitaminié avec 35 ingrédients actifs pour hommes actifs. 90 comprimés.",
    heading: "Multivitamines & Minéraux",
    intro:
      "Ce rayon rassemble les complexes multivitaminières. Vous y trouverez Opti-Men d'Optimum Nutrition, un complexe de 35 ingrédients actifs (vitamines, minéraux, acides aminés et extraits végétaux) sous forme de 90 comprimés, spécialement formulé pour les hommes actifs et les sportifs.",
  },
  "supplement/omega-3-acides-gras": {
    title: "Oméga-3 EPA & DHA : 120 Softgels | IRONZ Maroc",
    description:
      "Hiro.Lab Omega-3 avec EPA et DHA en 120 softgels – pour la santé du cœur et du cerveau.",
    heading: "Oméga-3 & Acides Gras",
    intro:
      "Ce rayon propose des compléments à base d'oméga-3 et d'acides gras. Vous y trouverez l'Omega-3 de Hiro.Lab, riche en EPA et DHA, sous forme de 120 softgels pour une supplémentation régulière. Ces acides gras contribuent au fonctionnement normal du cœur et du cerveau.",
  },
  "accessoires/pack-de-boxe": {
    title: "Pack de Boxe IRONZ : sac, gants, protège-dents | IRONZ Maroc",
    description:
      "Pack complet pour la boxe : sac de frappe IRONZ 1,20 m, support mural, paire de gants et protège-dents Everlast.",
    heading: "Pack de Boxe IRONZ",
    intro:
      "Ce pack réunit l'essentiel pour commencer à boxer : un sac de frappe IRONZ en PVC de 1,20 m, un support mural avec kit de fixation, une paire de gants de boxe et un protège-dents Everlast. La personnalisation des gants (couleur et taille) est possible. Il reste distinct des accessoires de boxe individuels.",
  },
  "accessoires/soins-corporels": {
    title: "Soins Corporels : crème de massage à l'arnica | IRONZ Maroc",
    description:
      "Crème de massage Clean Body à l'arnica (100 ml), formule vegan pour la relaxation musculaire post-entraînement.",
    heading: "Soins Corporels",
    intro:
      "Ce rayon présente les soins corporels pour la récupération. Vous y trouverez la crème de massage Clean Body à l'extrait d'arnica, formule vegan de 100 ml qui favorise la relaxation musculaire après l'effort. Texture onctueuse et non grasse, facilement absorbée.",
  },
  "equipements/poids-libres": {
    title: "Équipements de poids libres : haltères IRONBULL | IRONZ Maroc",
    description:
      "Haltères IRONBULL avec têtes en acier et revêtement caoutchouc, poignée chromée. Équipement de musculation pour salle ou home gym.",
    heading: "Équipements de poids libres",
    intro:
      "Ce rayon présente les équipements de poids libres, distincts des accessoires (kettlebells et disques). Vous trouverez ici les haltères IRONBULL avec des têtes en acier massif recouverts de caoutchouc et une poignée chromée bien soudée, un équipement robuste pour salle de sport ou home gym.",
  },
  "equipements/barres-de-traction": {
    title: "Barre de Traction Multifonction : pour porte et sol | IRONZ Maroc",
    description:
      "Barre de traction installable sur porte, prises multiples pour dos, bras, épaules, pectoraux et triceps.",
    heading: "Barres de Traction",
    intro:
      "Cette page propose une barre de traction multifonction s'installant sur un encadrement de porte. Grâce à ses prises multiples, elle permet de travailler le dos, les biceps, les épaules, les pectoraux et les triceps, soit accrochée à une porte, soit utilisée au sol pour des pompes et des dips. Convient aux entraînements à domicile.",
  },
  /* STEP 5.2D — low-priority thin subcategory pages */
  "accessoires/chaussette-de-sport": {
    title: "Chaussettes de Sport Antidérapantes | IRONZ Maroc",
    description:
      "Chaussettes antidérapantes à maintien ergonomique et matières respirantes. Football, basketball, course. 66 MAD.",
    heading: "Chaussettes de Sport Antidérapantes",
    intro:
      "Chaussettes antidérapantes à maintien ergonomique, grip terrain et matières respirantes. Idéales pour football, basketball, course et sports de combat.",
  },
  "accessoires/accessoires-de-natation": {
    title: "Bonnet de Piscine Souple Étanche | IRONZ Maroc",
    description:
      "Bonnet de piscine souple et étanche, protège les cheveux du chlore. Maintien parfait pour entraînements natation. 66 MAD.",
    heading: "Bonnet de Piscine",
    intro:
      "Bonnet de piscine souple, étanche et stylé. Protège les cheveux du chlore et assure un maintien parfait pendant les séances de natation.",
  },
  "accessoires/accessoires-de-foot": {
    title: "Cônes Triangulaires — Pack Agilité Foot 50 pcs | IRONZ Maroc",
    description:
      "Pack de 50 cônes triangulaires 4,2 cm : marquage au sol, parcours d'agilité, travail de vitesse. Football, fitness, athlétisme. 189 MAD.",
    heading: "Pack Cônes Triangulaires",
    intro:
      "50 cônes triangulaires de 4,2 cm pour marquage au sol, parcours d'agilité et travail de vitesse. Football, fitness, athlétisme.",
  },
  "accessoires/accessoires-de-sport": {
    title: "Bandes Élastiques Tubes — Ensemble Résistance | IRONZ Maroc",
    description:
      "Ensemble de tubes expander : 3 niveaux de résistance. Bras, poitrine, épaules, dos. 119 MAD.",
    heading: "Bandes Élastiques",
    intro:
      "Ensemble de tubes expander avec 3 niveaux de résistance pour tonifier bras, poitrine, épaules et dos. Entraînement à domicile ou en salle.",
  },
  "supplement/boisson-energisante": {
    title: "Boisson Énergisante ABE — 200 mg Caféine | IRONZ Maroc",
    description:
      "ABE Performance Energy Drink : 200 mg caféine, 0 sucre, 0 calorie, 10 saveurs. Avant entraînement ou travail. 29 MAD.",
    heading: "Boisson Énergisante ABE",
    intro:
      "ABE All Black Everything — 200 mg de caféine, 0 sucre, 0 calorie. Énergie intense et concentration pour l'entraînement ou la journée. 10 saveurs.",
  },
};

type SubcategoryPageProps = {
  params: Promise<{ slug: string; subSlug: string }>;
};

async function getSubcategoryPageData(slug: string, subSlug: string) {
  const products = await getAllProducts();
  const taxonomy = findTaxonomySubcategory(products, slug, subSlug);
  if (!taxonomy) return null;

  const matchingProducts = products.filter((product) =>
    productMatchesSubcategory(product, taxonomy.category.slug, taxonomy.subcategory.slug),
  );

  if (matchingProducts.length === 0) return null;

  return {
    ...taxonomy,
    products: matchingProducts,
  };
}

function subcategorySeoText(data: Awaited<ReturnType<typeof getSubcategoryPageData>>) {
  if (!data) {
    return {
      title: "Sous-catégorie introuvable | IRONZ",
      description: "",
      heading: "Sous-catégorie introuvable",
      intro: "",
    };
  }

  const seo = SUBCATEGORY_SEO[`${data.category.slug}/${data.subcategory.slug}`];
  if (seo) return seo;

  return {
    title: `${data.subcategory.name} au Maroc | IRONZ`,
    description: `Découvrez notre sélection ${data.subcategory.name.toLowerCase()} chez IRONZ, avec des produits adaptés au sport, au fitness et à la musculation au Maroc.`,
    heading: `${data.subcategory.name} au Maroc`,
    intro: `Explorez les produits ${data.subcategory.name.toLowerCase()} disponibles chez IRONZ pour vous équiper avec du matériel adapté à vos entraînements au Maroc.`,
  };
}

export async function generateMetadata({
  params,
}: SubcategoryPageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const data = await getSubcategoryPageData(slug, subSlug);

  if (!data) {
    return {
      title: "Sous-catégorie introuvable | IRONZ",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/categories/${data.category.slug}/${data.subcategory.slug}`;
  const { title, description } = subcategorySeoText(data);

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: "website",
    },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug, subSlug } = await params;
  const data = await getSubcategoryPageData(slug, subSlug);
  if (!data) notFound();

  const canonicalUrl = `${SITE_URL}/categories/${data.category.slug}/${data.subcategory.slug}`;
  const { heading, intro } = subcategorySeoText(data);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.category.name,
        item: `${SITE_URL}/categories/${data.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.subcategory.name,
        item: canonicalUrl,
      },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: heading,
    itemListElement: data.products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}/produit/${productSlug(product)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className="container mx-auto px-3 sm:px-4 pt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
      >
        <ol className="flex flex-wrap items-center justify-center gap-2">
          <li>
            <Link href="/" className="hover:text-yellow-600 dark:hover:text-yellow-400">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categories/${data.category.slug}`}
              className="hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              {data.category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900 dark:text-white" aria-current="page">
            {data.subcategory.name}
          </li>
        </ol>
      </nav>
      <CategoryProductsClient
        initialProducts={data.products as Product[]}
        heading={heading}
        intro={intro}
        initialCategoryName={data.category.name}
        initialSubCategoryName={data.subcategory.name}
        lockedCategoryName={data.category.name}
        lockedSubCategoryName={data.subcategory.name}
      />
    </>
  );
}
