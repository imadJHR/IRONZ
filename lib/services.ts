export type Language = "fr" | "en";

export type ServiceHubIconName =
  | "layout"
  | "home"
  | "building"
  | "palette"
  | "activity"
  | "layers"
  | "outdoor";

export type CanonicalServiceId =
  | "amenagement-salle"
  | "home-gym"
  | "salle-professionnelle"
  | "personnalisation-accessoires"
  | "espace-enfance"
  | "revetement-sol-mur"
  | "amenagement-terrains-sport";

export interface CanonicalService {
  id: CanonicalServiceId;
  title: string;
  shortTitle?: string;
  href: string;
  description: string;
  parentId?: CanonicalServiceId;
  navLabel: Record<Language, string>;
  hubTitle: string;
  hubDescription: string;
  hubIcon: ServiceHubIconName;
  homepageTitle?: string;
  homepageDescription?: string;
  showInHomepage: boolean;
  showInHeader: boolean;
  showInDevis: boolean;
  showInSitemap: boolean;
  relatedServiceIds: CanonicalServiceId[];
}

export interface ServiceNavigationItem {
  name: string;
  path: string;
  subLinks?: Array<{ name: string; path: string }>;
}

export const SERVICES: CanonicalService[] = [
  {
    id: "amenagement-salle",
    title: "Aménagement de salle",
    href: "/services/amenagement-salle",
    description:
      "Conception et réalisation d'espaces fitness pour home gym, salles professionnelles, hôtels et centres sportifs.",
    navLabel: { fr: "Aménagement de salle", en: "Room Setup" },
    hubTitle: "Aménagement de salle",
    hubDescription: "Projet global pour home gym, salle professionnelle, hôtel ou centre sportif.",
    hubIcon: "layout",
    homepageTitle: "Aménagement de Salles",
    homepageDescription:
      "Conception et réalisation d'espaces fitness selon le projet, du home gym au complexe sportif professionnel.",
    showInHomepage: true,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: ["home-gym", "salle-professionnelle", "revetement-sol-mur", "amenagement-terrains-sport"],
  },
  {
    id: "home-gym",
    title: "Home Gym",
    href: "/services/amenagement-salle/home-gym",
    description:
      "Aménagement de salle de sport privée à domicile avec choix d'équipements et configuration adaptée à l'espace.",
    parentId: "amenagement-salle",
    navLabel: { fr: "Home Gym", en: "Home Gym" },
    hubTitle: "Home Gym",
    hubDescription: "Salle de sport privée sur mesure à domicile.",
    hubIcon: "home",
    showInHomepage: false,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: ["amenagement-salle", "revetement-sol-mur"],
  },
  {
    id: "salle-professionnelle",
    title: "Salle professionnelle",
    href: "/services/amenagement-salle/salle-professionnelle",
    description:
      "Projet de salle de sport professionnelle pour espace commercial, entreprise, hôtel ou établissement sportif.",
    parentId: "amenagement-salle",
    navLabel: { fr: "Salle Professionnelle", en: "Professional Gym" },
    hubTitle: "Salle professionnelle",
    hubDescription: "Équipement complet pour salle commerciale ou espace fitness professionnel.",
    hubIcon: "building",
    showInHomepage: false,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: ["amenagement-salle", "revetement-sol-mur"],
  },
  {
    id: "personnalisation-accessoires",
    title: "Personnalisation d'accessoires",
    href: "/services/personnalisation-accessoires",
    description:
      "Personnalisation d'accessoires sportifs selon vos couleurs, votre identité visuelle et le besoin du projet.",
    navLabel: { fr: "Personnalisation d'accessoires", en: "Accessory Customization" },
    hubTitle: "Personnalisation",
    hubDescription: "Accessoires sportifs personnalisés : couleurs, logo et finitions selon le projet.",
    hubIcon: "palette",
    homepageTitle: "Personnalisation",
    homepageDescription:
      "Marquez votre identité avec des équipements uniques aux couleurs et logos de votre marque.",
    showInHomepage: true,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: [],
  },
  {
    id: "espace-enfance",
    title: "Espace enfance",
    href: "/services/espace-enfance",
    description:
      "Aménagement d'espaces sportifs et d'activité physique adaptés aux enfants, avec une attention portée à l'usage et à la sécurité.",
    navLabel: { fr: "Espace enfance", en: "Kids Area" },
    hubTitle: "Espace Enfance",
    hubDescription: "Espaces sportifs adaptés aux enfants et aux structures d'accueil.",
    hubIcon: "activity",
    homepageTitle: "Espace Enfance",
    homepageDescription:
      "Création de zones d'activités sportives ludiques, sécurisées et adaptées aux plus jeunes.",
    showInHomepage: true,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: [],
  },
  {
    id: "revetement-sol-mur",
    title: "Revêtement sol & mur",
    href: "/services/revetement-sol-mur",
    description:
      "Solutions de revêtement de sol et mur sportif pour salles de sport, home gyms et projets professionnels.",
    navLabel: { fr: "Revêtement sol & mur", en: "Floor & Wall Covering" },
    hubTitle: "Revêtements",
    hubDescription: "Sol et mur sportifs : protection, confort d'usage et cohérence du projet.",
    hubIcon: "layers",
    homepageTitle: "Revêtement Sol & Mur",
    homepageDescription:
      "Solutions de revêtement pour sols et murs sportifs, selon l'usage, les contraintes du site et le projet.",
    showInHomepage: true,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: ["amenagement-salle", "home-gym", "salle-professionnelle"],
  },
  {
    id: "amenagement-terrains-sport",
    title: "Aménagement de terrains de sport",
    href: "/services/amenagement-terrains-sport",
    description:
      "Aménagement de terrains de sport sur mesure : étude du projet, surface sportive, clôture périphérique et équipement.",
    navLabel: { fr: "Aménagement de terrains de sport", en: "Sports Field Development" },
    hubTitle: "Terrains de sport",
    hubDescription: "Surface sportive, clôture périphérique et équipement selon le projet.",
    hubIcon: "outdoor",
    homepageTitle: "Terrains de Sport",
    homepageDescription:
      "Aménagement de terrains de sport sur mesure : étude du projet, surface sportive, clôture périphérique et équipement. Sur devis.",
    showInHomepage: true,
    showInHeader: true,
    showInDevis: true,
    showInSitemap: true,
    relatedServiceIds: ["revetement-sol-mur", "amenagement-salle"],
  },
];

export const LEGACY_SERVICE_QUERY_ALIASES: Record<string, CanonicalServiceId> = {
  "terrain-sport": "amenagement-terrains-sport",
  "terrains-sport": "amenagement-terrains-sport",
};

export function getServiceById(id: CanonicalServiceId) {
  return SERVICES.find((service) => service.id === id);
}

export function getHomepageServices() {
  return SERVICES.filter((service) => service.showInHomepage);
}

export function getQuoteServices() {
  return SERVICES.filter((service) => service.showInDevis);
}

export function getSitemapServices() {
  return SERVICES.filter((service) => service.showInSitemap);
}

export function getCanonicalServiceCards() {
  return SERVICES.map((service) => ({
    id: service.id,
    href: service.href,
    title: service.hubTitle,
    desc: service.hubDescription,
    icon: service.hubIcon,
  }));
}

export function getServiceNavigationItems(language: Language): ServiceNavigationItem[] {
  return SERVICES.filter((service) => service.showInHeader && !service.parentId).map((service) => {
    const children = SERVICES.filter(
      (child) => child.parentId === service.id && child.showInHeader,
    );

    return {
      name: service.navLabel[language],
      path: service.href,
      ...(children.length
        ? {
            subLinks: children.map((child) => ({
              name: child.navLabel[language],
              path: child.href,
            })),
          }
        : {}),
    };
  });
}

export function mapServiceQueryParam(value: string | null): CanonicalServiceId | null {
  if (!value) return null;

  const canonical = SERVICES.find((service) => service.id === value);
  if (canonical) return canonical.id;

  return LEGACY_SERVICE_QUERY_ALIASES[value] ?? null;
}
