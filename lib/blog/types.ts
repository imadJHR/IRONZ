export type BlogCategory =
  | "Musculation"
  | "Cardio"
  | "Nutrition"
  | "Home Gym"
  | "Aménagement"
  | "Services";

export interface BlogSection {
  h2: string;
  paragraphs?: string[];
  list?: string[];
}

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  keyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  intro: string[];
  sections: BlogSection[];
  faq: BlogFaqItem[];
  cta: { label: string; href: string };
  related: string[];
}
