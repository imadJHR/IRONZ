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
import {
  OG_LOGO_IMAGES,
  TWITTER_LOGO_IMAGES,
} from "../../../../lib/og-image";

const SITE_URL = "https://www.ironz.ma";

type SubcategorySeo = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  families?: { name: string; detail: string }[];
  familiesTitle?: string;
  familiesAriaLabel?: string;
  guidance?: { title: string; text: string }[];
  guidanceTitle?: string;
  guidanceAriaLabel?: string;
  linksAriaLabel?: string;
  linksShopping?: { href: string; label: string }[];
  linksProject?: { href: string; label: string }[];
};

const SUBCATEGORY_SEO: Record<string, SubcategorySeo> = {
  "equipements/machine-de-fitness": {
    title: "Machines de fitness et musculation au Maroc | IRONZ",
    description:
      "Machines de fitness et musculation au Maroc : tapis roulant, vélos, rameur, presse à jambes, rack et home gym. 13 appareils de 1 999 à 65 000 MAD.",
    heading: "Machines de fitness et musculation au Maroc",
    intro:
      "Ce rayon réunit les machines de fitness et de musculation IRONZ : tapis roulant, vélos d'appartement, spinning, semi-allongé et rameur pour le cardio, presse à jambes, leg curl, rack et banc pour la musculation, ainsi qu'une station Home Gym, un pack fitness maison et un Reformer Pilates. Pour comparer, partez de vos exercices et de l'espace disponible, puis vérifiez dimensions et caractéristiques sur chaque fiche produit.",
    families: [
      {
        name: "Cardio",
        detail:
          "Tapis roulant, vélos d'appartement, spinning, semi-allongé et rameur pour l'endurance et la perte de poids.",
      },
      {
        name: "Musculation",
        detail:
          "Presse à jambes, leg curl et rack multifonction pour les exercices de renforcement à charge guidée.",
      },
      {
        name: "Home Gym",
        detail:
          "Station multifonction et pack fitness complet pour s'entraîner à la maison sur un espace réduit.",
      },
      {
        name: "Bancs & racks",
        detail:
          "Banc Adidas et structures d'accueil pour compléter vos exercices avec poids libres ou guidés.",
      },
      {
        name: "Pilates",
        detail:
          "Reformer Pilates pour un travail de gainage, de souplesse et de renforcement profond.",
      },
    ],
    guidance: [
      {
        title: "Votre objectif d'entraînement",
        text: "Le cardio (tapis roulant, vélos, rameur) vise l'endurance et la dépense calorique ; la musculation (presse, leg curl, rack, banc) vise le renforcement et la prise de muscle. Plusieurs appareils, comme le rack multifonction et la station Home Gym, combinent les deux.",
      },
      {
        title: "L'espace dont vous disposez",
        text: "Mesurez l'emplacement prévu avant de choisir : un rameur ou un banc reste compact, tandis qu'une presse à jambes, un rack ou un tapis roulant demandent plus de profondeur. Chaque fiche indique les dimensions de l'appareil, vérifiables avant l'achat.",
      },
      {
        title: "Usage à domicile ou projet professionnel",
        text: "Pour un usage à domicile, les vélos, le rameur, le banc et la station Home Gym couvrent l'essentiel. Pour un projet de salle professionnelle, la presse à jambes, le leg curl et le rack Panatta sont conçus pour un usage intensif ; la page aménagement de salle professionnelle vous accompagne sur l'implantation.",
      },
      {
        title: "Comparer les fiches avant de décider",
        text: "Chaque fiche produit détaille les dimensions, le poids maximal supporté, les fonctionnalités et le prix. Vérifiez ces informations avant votre achat, et demandez un devis pour les appareils destinés à un projet.",
      },
    ],
    linksShopping: [
      {
        href: "/guides/choisir-machine-cardio-tapis-velo-rameur-maroc",
        label: "Guide cardio : tapis roulant, vélo ou rameur",
      },
      { href: "/categories/equipements", label: "Voir tous les équipements" },
      {
        href: "/categories/accessoires/poids-libres",
        label: "Compléter avec haltères, kettlebells et disques",
      },
    ],
    linksProject: [
      {
        href: "/services/amenagement-salle/home-gym",
        label: "Aménager une salle à domicile",
      },
      {
        href: "/services/amenagement-salle/salle-professionnelle",
        label: "Aménager une salle professionnelle",
      },
      {
        href: "/demande-devis?service=amenagement-salle",
        label: "Demander un devis pour un projet",
      },
    ],
  },
  "accessoires/accessoires-de-fitness": {
    title: "Accessoires de fitness au Maroc : bandes, tapis et steps | IRONZ",
    description:
      "Accessoires de fitness au Maroc : bandes de résistance, tapis de yoga, steps, cordes à sauter, ballons et maintiens. 22 références de 75 à 489 MAD.",
    heading: "Accessoires de fitness au Maroc",
    intro:
      "Ce rayon rassemble le petit matériel pour vos séances de fitness : bandes de résistance, tapis de yoga, steps, cordes à sauter, ballon et foam roller, ainsi que des poignées de pompes, un hand grip et du matériel de maintien comme des bandes, un bandage de genou ou un support de poignet. Vous y trouverez aussi un sac de sport, un shaker et une goupille de sécurité pour machine. Comparez les formats, résistances et dimensions de chaque fiche pour choisir l'accessoire adapté à vos exercices.",
    familiesTitle: "Types d'accessoires",
    familiesAriaLabel: "Types d'accessoires de fitness",
    families: [
      {
        name: "Bandes de résistance",
        detail:
          "Bandes et élastiques de résistance proposés en plusieurs formats pour le renforcement et le travail musculaire à domicile.",
      },
      {
        name: "Maintien et protections",
        detail:
          "Bandes de maintien, bandage de genou, épaule de maintien, support de poignet et kinesiology tape pour accompagner l'effort.",
      },
      {
        name: "Steps, tapis et équilibre",
        detail:
          "Steps, tapis de yoga, ballon et foam roller pour les exercices au sol, d'équilibre et la récupération.",
      },
      {
        name: "Cordes et poignées",
        detail:
          "Cordes à sauter, poignées de pompes et hand grip pour le travail cardio et la prise des avant-bras.",
      },
    ],
    guidanceTitle: "vos accessoires de fitness",
    guidanceAriaLabel: "Choisir vos accessoires de fitness",
    guidance: [
      {
        title: "Selon vos exercices",
        text: "Les bandes servent au renforcement, les steps et cordes au cardio, les tapis et ballons aux exercices au sol, et le matériel de maintien à accompagner l'effort. Partez des exercices prévus dans votre routine.",
      },
      {
        title: "Résistance et format",
        text: "Les bandes de résistance existent en plusieurs niveaux, et les steps ou ballons en plusieurs formats. Chaque fiche indique la résistance ou les dimensions proposées pour la référence.",
      },
      {
        title: "L'espace disponible",
        text: "Ce petit matériel s'utilise sans installation et se range facilement, ce qui convient à un entraînement à domicile comme en salle. Vérifiez les dimensions sur la fiche si l'encombrement compte pour vous.",
      },
      {
        title: "Vérifier chaque fiche avant l'achat",
        text: "Chaque fiche présente la résistance, le format, le conditionnement et les caractéristiques de l'accessoire. Comparez les références pour choisir celle qui correspond à vos exercices.",
      },
    ],
    linksShopping: [
      { href: "/categories/accessoires", label: "Accessoires de sport" },
      {
        href: "/categories/accessoires/poids-libres",
        label: "Poids libres, haltères et kettlebells",
      },
      {
        href: "/categories/equipements/machine-de-fitness",
        label: "Machines de fitness et musculation",
      },
    ],
    linksProject: [
      {
        href: "/services/amenagement-salle/home-gym",
        label: "Projet Home Gym",
      },
    ],
  },
  "accessoires/accessoires-de-boxe": {
    title: "Accessoires de boxe au Maroc : gants, sacs et protections | IRONZ",
    description:
      "Accessoires de boxe au Maroc : gants, bandes, protège-dents, protège-tibias, sacs de frappe, paos, pads et cibles. 15 références de 55 à 1 499 MAD.",
    heading: "Accessoires et équipement de boxe au Maroc",
    intro:
      "Ce rayon rassemble le matériel de boxe IRONZ pour préparer vos entraînements : gants, bandes et protège-dents côté protections, sacs de frappe en plusieurs dimensions, et paos, pads, cibles, plastron et bâtons d'esquive pour le travail à deux. Vous y trouverez aussi un sac de boxe compact, un Bulgarian bag et des protège-tibias, dont un modèle enfant. Comparez les dimensions et les indications de chaque fiche pour choisir le matériel correspondant à votre pratique.",
    familiesTitle: "Matériel de boxe",
    familiesAriaLabel: "Matériel de boxe",
    families: [
      {
        name: "Protections",
        detail:
          "Gants de boxe, bandes, protège-dents et protège-tibias, dont un modèle enfant, pour équiper le combattant avant la séance.",
      },
      {
        name: "Sacs de frappe",
        detail:
          "Sacs de frappe IRONZ en plusieurs dimensions, un sac de boxe compact et un Bulgarian bag pour le travail de puissance.",
      },
      {
        name: "Cibles et travail à deux",
        detail:
          "Paos, pads, cibles de frappe, plastron et bâtons d'esquive pour les exercices de frappe et d'esquive avec un partenaire.",
      },
    ],
    guidanceTitle: "votre matériel de boxe",
    guidanceAriaLabel: "Choisir votre matériel de boxe",
    guidance: [
      {
        title: "Votre type d'entraînement",
        text: "Le travail de frappe seul se fait sur un sac, à deux sur des paos, pads ou cibles. Les protections — gants, bandes, protège-dents — sont communes à toutes les séances, et les bâtons d'esquive ou le plastron sont dédiés aux exercices à deux.",
      },
      {
        title: "Protections ou cibles",
        text: "On distingue d'abord ce qui se porte (gants, bandes, protège-dents, protège-tibias) de ce qui sert de cible (sacs, paos, pads, cibles, plastron). Un pratiquant a besoin des deux : se protéger et frapper.",
      },
      {
        title: "Dimensions et usage",
        text: "Les sacs de frappe IRONZ existent en plusieurs dimensions, et plusieurs cibles sont proposées en formats différents. Vérifiez les dimensions, le poids et les indications de chaque fiche avant de choisir.",
      },
      {
        title: "Vérifier chaque fiche avant l'achat",
        text: "Chaque fiche produit présente la référence précisément : dimensions, conditionnement et caractéristiques disponibles. Comparez les fiches pour vous assurer que le matériel correspond à votre pratique.",
      },
    ],
    linksAriaLabel: "Voir aussi",
    linksShopping: [
      {
        href: "/guides/choisir-equipement-boxe-debutant-maroc",
        label: "Guide débutant : par quoi commencer la boxe",
      },
      { href: "/categories/accessoires", label: "Accessoires de sport" },
      {
        href: "/categories/accessoires/poids-libres",
        label: "Poids libres, haltères et kettlebells",
      },
    ],
  },
  "accessoires/poids-libres": {
    title: "Poids libres : haltères, kettlebells et disques au Maroc | IRONZ",
    description:
      "Poids libres au Maroc : haltères IRONBULL, haltères PVC, kettlebells et disques de musculation. Comparez 19 références de 99 à 2 350 MAD.",
    heading: "Poids libres, haltères et kettlebells au Maroc",
    intro:
      "Ce rayon rassemble les poids libres IRONZ pour la musculation et l'entraînement à domicile ou en salle : haltères IRONBULL dans plusieurs charges, haltères PVC, kettlebells et disques de musculation, dont des disques olympiques. Pour choisir, partez des exercices prévus et de la progression recherchée, puis vérifiez le poids annoncé et les caractéristiques de chaque fiche. Pour les disques, contrôlez aussi la compatibilité avec votre barre.",
    families: [
      {
        name: "Haltères",
        detail:
          "Haltères IRONBULL dans plusieurs charges et haltères PVC légers pour le travail unilateral et la progression.",
      },
      {
        name: "Kettlebells",
        detail:
          "Kettlebells proposés dans plusieurs poids pour les exercices fonctionnels, le gainage et le renforcement.",
      },
      {
        name: "Disques",
        detail:
          "Disques de musculation, dont des disques olympiques, pour augmenter la résistance de vos exercices.",
      },
    ],
    guidanceTitle: "vos poids libres",
    guidanceAriaLabel: "Choisir vos poids libres",
    guidance: [
      {
        title: "Votre objectif d'entraînement",
        text: "Les haltères conviennent aux exercices de musculation classiques par groupe musculaire, les kettlebells aux mouvements fonctionnels et au gainage, et les disques à l'augmentation de la résistance sur une barre. Votre programme détermine la famille à privilégier.",
      },
      {
        title: "La charge et la progression",
        text: "Choisissez une charge adaptée à votre niveau, puis progressez par paliers. Les haltères IRONBULL couvrent plusieurs poids successifs, ce qui permet d'augmenter la charge au fur et à mesure de votre évolution.",
      },
      {
        title: "L'espace disponible",
        text: "Les haltères et les kettlebells s'utilisent sur un espace réduit, sans installation. Les disques nécessitent une barre pour être chargés. Vérifiez les dimensions et le poids annoncé sur chaque fiche avant de choisir.",
      },
      {
        title: "Vérifier chaque fiche avant l'achat",
        text: "Chaque fiche produit indique le poids exact, le conditionnement et les caractéristiques de la référence. Pour les disques, contrôlez la compatibilité avec votre barre avant de commander.",
      },
    ],
    linksShopping: [
      {
        href: "/guides/choisir-halteres-kettlebells-disques-maroc",
        label: "Guide achat poids libres : haltères, kettlebells et disques",
      },
      { href: "/categories/accessoires", label: "Accessoires de sport" },
      {
        href: "/categories/equipements/machine-de-fitness",
        label: "Machines de fitness et musculation",
      },
    ],
    linksProject: [
      {
        href: "/services/amenagement-salle/home-gym",
        label: "Projet Home Gym",
      },
      {
        href: "/demande-devis?service=amenagement-salle",
        label: "Demander un devis d'aménagement",
      },
    ],
  },
  "accessoires/accessoires-de-musculation": {
    title: "Accessoires de musculation au Maroc : barres et cordes | IRONZ",
    description:
      "Accessoires de musculation au Maroc : barres de traction et tirage, corde triceps, poignée de prise et charges 5 kg. 9 références de 155 à 1 459 MAD.",
    heading: "Accessoires de musculation au Maroc",
    intro:
      "Ce rayon rassemble les accessoires de musculation IRONZ pour compléter vos exercices de tirage, traction et travail des triceps : barres de traction, barre de tirage, barre de musculation, cordes triceps, poignée de prise en croix et charges de 5 kg. La sélection reste distincte des haltères, kettlebells et disques du rayon Poids libres. Avant de choisir, vérifiez sur chaque fiche la longueur, la fixation, le format et les caractéristiques utiles à votre installation.",
    familiesTitle: "Types d'accessoires de musculation",
    familiesAriaLabel: "Types d'accessoires de musculation",
    families: [
      {
        name: "Barres et tirage",
        detail:
          "Barre de tirage, barres de traction en plusieurs formats et barre de musculation pour compléter les exercices haut du corps.",
      },
      {
        name: "Cordes triceps",
        detail:
          "Corde triceps IRONZ et Triceps Rope pour les mouvements de poussée, tirage et isolation sur installation adaptée.",
      },
      {
        name: "Poignées et charges",
        detail:
          "Poignée de prise en croix simple en inox et charges de 5 kg : vérifiez le format exact et les usages indiqués sur la fiche.",
      },
    ],
    guidanceTitle: "vos accessoires de musculation",
    guidanceAriaLabel: "Choisir vos accessoires de musculation",
    guidance: [
      {
        title: "Selon l'exercice visé",
        text: "Les barres de traction et de tirage servent aux exercices haut du corps, les cordes ciblent surtout les mouvements triceps et les poignées changent la prise. Choisissez d'abord selon l'exercice prévu.",
      },
      {
        title: "Format et prise en main",
        text: "Longueur de barre, forme de poignée, corde ou accessoire de prise : chaque format modifie l'utilisation. Comparez les fiches pour vérifier le format exact avant l'achat.",
      },
      {
        title: "Installation disponible",
        text: "Certains accessoires se fixent ou s'utilisent avec une installation adaptée. Vérifiez la fixation, les dimensions et les indications de compatibilité disponibles sur la fiche produit.",
      },
      {
        title: "Ne pas confondre avec les poids libres",
        text: "Ce rayon couvre les barres, cordes, poignées et compléments de travail. Pour haltères, kettlebells et disques, utilisez le rayon Poids libres, plus adapté à la charge indépendante.",
      },
    ],
    linksAriaLabel: "Voir aussi les rayons liés à la musculation",
    linksShopping: [
      { href: "/categories/accessoires", label: "Accessoires de sport" },
      {
        href: "/categories/accessoires/poids-libres",
        label: "Poids libres, haltères et kettlebells",
      },
      {
        href: "/categories/equipements/machine-de-fitness",
        label: "Machines de fitness et musculation",
      },
    ],
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

function SubcategoryBlocks({ seo }: { seo: SubcategorySeo }) {
  return (
    <>
      {seo.families && seo.families.length > 0 && (
        <section
          aria-label={seo.familiesAriaLabel || "Familles de machines"}
          className="container mx-auto px-3 sm:px-4 mt-2"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 sm:p-7">
            <h2 className="text-center font-display uppercase tracking-wide text-base sm:text-lg text-gray-900 dark:text-white mb-4 sm:mb-5">
              {seo.familiesTitle || "Familles de machines"}
            </h2>
            <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {seo.families.map((family) => (
                <li key={family.name}>
                  <p className="font-display uppercase tracking-wide text-sm text-yellow-600 dark:text-yellow-400">
                    {family.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {family.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {seo.guidance && seo.guidance.length > 0 && (
        <section
          aria-label={seo.guidanceAriaLabel || "Choisir sa machine de fitness"}
          className="container mx-auto px-3 sm:px-4 mt-10 sm:mt-12"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display uppercase tracking-wide text-base sm:text-lg text-gray-900 dark:text-white mb-4 sm:mb-5">
              {seo.guidanceTitle
                ? `Comment choisir ${seo.guidanceTitle}`
                : "Comment choisir votre machine"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {seo.guidance.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 sm:p-6"
                >
                  <h3 className="mb-2 text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {(seo.linksShopping || seo.linksProject) && (
        <section
          aria-label={seo.linksAriaLabel || "Voir aussi"}
          className="container mx-auto px-3 sm:px-4 mt-10 sm:mt-12"
        >
          <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2">
            {seo.linksShopping && seo.linksShopping.length > 0 && (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 sm:p-6">
                <h2 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
                  Côté achat
                </h2>
                <ul className="space-y-2">
                  {seo.linksShopping.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 underline-offset-4 hover:text-yellow-600 dark:hover:text-yellow-400 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {seo.linksProject && seo.linksProject.length > 0 && (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 sm:p-6">
                <h2 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
                  Côté projet et installation
                </h2>
                <ul className="space-y-2">
                  {seo.linksProject.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 underline-offset-4 hover:text-yellow-600 dark:hover:text-yellow-400 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

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
      images: OG_LOGO_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: TWITTER_LOGO_IMAGES,
      creator: "@ironz_official",
    },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { slug, subSlug } = await params;
  const data = await getSubcategoryPageData(slug, subSlug);
  if (!data) notFound();

  const canonicalUrl = `${SITE_URL}/categories/${data.category.slug}/${data.subcategory.slug}`;
  const seoAll = subcategorySeoText(data);
  const { heading, intro } = seoAll;
  const seoSubcategoryBlocks =
    seoAll === SUBCATEGORY_SEO["equipements/machine-de-fitness"] ||
    seoAll === SUBCATEGORY_SEO["accessoires/poids-libres"] ||
    seoAll === SUBCATEGORY_SEO["accessoires/accessoires-de-boxe"] ||
    seoAll === SUBCATEGORY_SEO["accessoires/accessoires-de-fitness"] ||
    seoAll === SUBCATEGORY_SEO["accessoires/accessoires-de-musculation"]
      ? seoAll
      : null;
  const renderIntroInClient = true;
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
      {seoSubcategoryBlocks && <SubcategoryBlocks seo={seoSubcategoryBlocks} />}
      <CategoryProductsClient
        initialProducts={data.products as Product[]}
        heading={heading}
        intro={renderIntroInClient ? intro : undefined}
        initialCategoryName={data.category.name}
        initialSubCategoryName={data.subcategory.name}
        lockedCategoryName={data.category.name}
        lockedSubCategoryName={data.subcategory.name}
      />
    </>
  );
}
