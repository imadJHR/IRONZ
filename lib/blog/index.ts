import type { BlogArticle, BlogCategory } from "./types";

// Articles — un fichier par article dans ce dossier.
import { article as tapisDeCourseMaroc } from "./tapis-de-course-maroc";
import { article as veloAppartementMaroc } from "./velo-appartement-maroc";
import { article as wheyProteineMaroc } from "./whey-proteine-maroc";
import { article as equipementMusculationMaroc } from "./equipement-musculation-maroc";
import { article as homeGymMaroc } from "./home-gym-maroc";
import { article as amenagementSalleSportMaroc } from "./amenagement-salle-sport-maroc";
import { article as revetementSolSportifMaroc } from "./revetement-sol-sportif-maroc";
import { article as salleSportProfessionnelleMaroc } from "./salle-sport-professionnelle-maroc";
import { article as amenagementTerrainSportMaroc } from "./amenagement-terrain-sport-maroc";
import { article as espaceEnfantSportifMaroc } from "./espace-enfant-sportif-maroc";
import { article as personnalisationAccessoiresSportMaroc } from "./personnalisation-accessoires-sport-maroc";
import { article as foamRollerMassageMaroc } from "./foam-roller-massage-maroc";
import { article as barreTractionMaroc } from "./barre-traction-maroc";
import { article as kettlebellMaroc } from "./kettlebell-maroc";
import { article as bancMusculationMaroc } from "./banc-musculation-maroc";
import { article as sacFrappeBoxeMaroc } from "./sac-frappe-boxe-maroc";

export const articles: BlogArticle[] = [
  tapisDeCourseMaroc,
  veloAppartementMaroc,
  wheyProteineMaroc,
  equipementMusculationMaroc,
  homeGymMaroc,
  amenagementSalleSportMaroc,
  revetementSolSportifMaroc,
  salleSportProfessionnelleMaroc,
  amenagementTerrainSportMaroc,
  espaceEnfantSportifMaroc,
  personnalisationAccessoiresSportMaroc,
  foamRollerMassageMaroc,
  barreTractionMaroc,
  kettlebellMaroc,
  bancMusculationMaroc,
  sacFrappeBoxeMaroc,
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string): BlogArticle[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  return article.related
    .map(getArticleBySlug)
    .filter((value): value is BlogArticle => Boolean(value));
}

export function getAllBlogSlugs(): string[] {
  return articles.map((article) => article.slug);
}

export const blogCategories: BlogCategory[] = [
  "Musculation",
  "Cardio",
  "Nutrition",
  "Home Gym",
  "Aménagement",
  "Services",
];

export type { BlogArticle, BlogCategory, BlogSection, BlogFaqItem } from "./types";
