/**
 * Registre des villes d'intervention IRONZ.
 *
 * Le client a confirmé qu'IRONZ peut intervenir dans ces cinq villes. Cela ne
 * signifie pas qu'IRONZ y possède un bureau, une agence ou une équipe locale.
 * Toute promesse de présence physique doit être confirmée avant publication.
 *
 * `hasPage` indique qu'une page dédiée indexable existe. Les villes sans page
 * restent couvertes par la section « Villes d'intervention » de la page
 * nationale du service, avec un lien vers le formulaire de devis.
 */

export type CityId = "casablanca" | "rabat" | "marrakech" | "tanger" | "agadir";

export interface City {
  id: CityId;
  name: string;
  slug: string;
  /** Requête cible de la page dédiée, lorsqu'elle existe. */
  keyword: string;
  /** Une page dédiée indexable existe. */
  hasPage: boolean;
  /** Description factuelle, utilisable sur la page nationale. */
  coverage: string;
  /** Angle éditorial qui justifierait une page dédiée. */
  angle: string;
  /** Informations manquantes avant de publier une page dédiée. */
  missing: string[];
}

export const CITIES: City[] = [
  {
    id: "casablanca",
    name: "Casablanca",
    slug: "casablanca",
    keyword: "aménagement salle de sport Casablanca",
    hasPage: true,
    coverage:
      "Plus grande ville du Royaume, Casablanca regroupe des clubs, des hôtels, des entreprises et des résidences où un projet d'aménagement peut être étudié.",
    angle:
      "Page dédiée existante. Marché B2B le plus important : clubs, hôtels, entreprises, résidences.",
    missing: [],
  },
  {
    id: "rabat",
    name: "Rabat",
    slug: "rabat",
    keyword: "aménagement salle de sport Rabat",
    hasPage: false,
    coverage:
      "Capitale administrative, Rabat compte des hôtels, des établissements scolaires, des entreprises et des résidences accueillant des espaces fitness.",
    angle:
      "Projets hôteliers, institutionnels et résidentiels. Page à créer uniquement si des références locales réelles sont fournies.",
    missing: [
      "projets d'aménagement réalisés à Rabat (pour illustrer sans inventer)",
      "modalités d'intervention depuis Agadir (visite, pose, suivi)",
      "éventuels partenaires ou fournisseurs locaux",
    ],
  },
  {
    id: "marrakech",
    name: "Marrakech",
    slug: "marrakech",
    keyword: "aménagement salle de sport Marrakech",
    hasPage: false,
    coverage:
      "Ville touristique et hôtelière, Marrakech voit des projets d'aménagement dans les hôtels, les résidences et les complexes sportifs.",
    angle:
      "Projets hôteliers et résidentiels. Un acteur local est déjà visible sur ce créneau : une page IRONZ n'est justifiée que par un contenu distinctif.",
    missing: [
      "projets d'aménagement réalisés à Marrakech",
      "modalités d'intervention depuis Agadir",
      "éléments différenciants par rapport aux acteurs locaux",
    ],
  },
  {
    id: "tanger",
    name: "Tanger",
    slug: "tanger",
    keyword: "aménagement salle de sport Tanger",
    hasPage: false,
    coverage:
      "Pôle économique du nord du Maroc, Tanger développe des zones hôtelières, des entreprises et des équipements sportifs.",
    angle:
      "Projets hôteliers et professionnels. Page à créer uniquement si une activité locale réelle peut être documentée.",
    missing: [
      "projets d'aménagement réalisés à Tanger",
      "modalités d'intervention depuis Agadir",
      "contraintes d'accès typiques des immeubles et hôtels de la ville",
    ],
  },
  {
    id: "agadir",
    name: "Agadir",
    slug: "agadir",
    keyword: "aménagement salle de sport Agadir",
    hasPage: true,
    coverage:
      "Ville d'IRONZ : le showroom du Sahara Mall permet de voir le matériel et d'échanger sur un projet avant de le chiffrer.",
    angle:
      "Page dédiée justifiée par la présence physique : showroom, accueil des projets et point de contact local.",
    missing: [],
  },
];

export function getCityById(id: CityId): City | undefined {
  return CITIES.find((city) => city.id === id);
}

export function getCityPages(): City[] {
  return CITIES.filter((city) => city.hasPage);
}

export function getCityHref(city: City): string {
  return city.hasPage
    ? `/services/amenagement-salle/${city.slug}`
    : `/demande-devis?service=amenagement-salle&ville=${encodeURIComponent(city.name)}`;
}

export function getCityKeyword(city: City): string {
  return city.keyword;
}
