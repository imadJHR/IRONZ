"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CardioIcon,
  ChevronRightIcon,
  DumbbellIcon,
  GridIcon,
  HomeGymIcon,
  NutritionIcon,
  PlanIcon,
  ServicesIcon,
} from "./icons";
import { articles, blogCategories } from "../../lib/blog";
import { cn } from "../../lib/utils";

type CategoryFilter = "Tout" | (typeof blogCategories)[number];

/** Palette stricte : noir / jaune / blanc. Icônes = set SVG pro maison. */
const CATEGORY_ICONS: Record<string, typeof DumbbellIcon> = {
  Musculation: DumbbellIcon,
  Cardio: CardioIcon,
  Nutrition: NutritionIcon,
  "Home Gym": HomeGymIcon,
  "Aménagement": PlanIcon,
  Services: ServicesIcon,
};

function CategoryBadge({ category }: { category: string }) {
  const Icon = CATEGORY_ICONS[category] ?? ServicesIcon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {category}
    </span>
  );
}

export default function BlogHubClient() {
  const [filter, setFilter] = useState<CategoryFilter>("Tout");

  const visible = useMemo(
    () => (filter === "Tout" ? articles : articles.filter((a) => a.category === filter)),
    [filter],
  );
  const [featured, ...rest] = visible;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black px-4 pb-14 pt-28 text-white sm:px-6 md:pb-16 md:pt-36">
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/10"
          aria-hidden="true"
        />
        <div
          className="absolute -top-1/2 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Fil d'Ariane" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow-500">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-medium text-white">
                Blog
              </li>
            </ol>
          </nav>

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-yellow-500">
            Le blog IRONZ
          </p>
          <h1 className="max-w-3xl font-display text-4xl uppercase leading-tight tracking-wide sm:text-5xl md:text-6xl">
            Fitness, musculation et aménagement au Maroc
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Des articles concrets pour s&apos;équiper au Maroc : choisir son
            matériel, comparer les prix, aménager une salle. Écrits à partir du
            catalogue IRONZ et des questions reçues.
          </p>
        </div>
      </section>

      {/* ── Filtres ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-black/95">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            role="tablist"
            aria-label="Filtrer les articles par univers"
            className="flex gap-2 overflow-x-auto py-4"
          >
            {(["Tout", ...blogCategories] as CategoryFilter[]).map((cat) => {
              const active = filter === cat;
              const Icon = cat === "Tout" ? GridIcon : (CATEGORY_ICONS[cat] ?? ServicesIcon);
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all",
                    active
                      ? "border-yellow-500 bg-yellow-500 text-black shadow-md shadow-yellow-500/25"
                      : "border-black/15 bg-white text-black hover:border-yellow-500 hover:text-black dark:border-white/15 dark:bg-black dark:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {featured ? (
        <div className="mx-auto max-w-6xl bg-white px-4 py-12 text-black dark:bg-black dark:text-white sm:px-6 md:py-16">
          {/* ── À la une ─────────────────────────────────────── */}
          <p className="mb-6 font-display text-xs uppercase tracking-[0.25em] text-black/60 dark:text-white/60">
            À la une{filter !== "Tout" ? ` — ${filter}` : ""}
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10 dark:border-white/10 dark:bg-black"
          >
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <CategoryBadge category={featured.category} />
              </div>
              <h2 className="mt-4 font-display text-2xl uppercase leading-tight tracking-wide transition-colors group-hover:text-yellow-600 dark:group-hover:text-yellow-400 sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-black/70 dark:text-white/70">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-black transition-all group-hover:gap-4 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                Lire l&apos;article
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <div
              className="relative flex min-h-56 flex-col justify-end overflow-hidden bg-black p-6 sm:p-10"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/15 via-transparent to-yellow-600/10" />
              <DumbbellIcon className="absolute right-6 top-6 h-16 w-16 text-yellow-500/30" />
              <p className="relative inline-flex items-center gap-2 text-sm uppercase tracking-widest text-yellow-500">
                {(() => {
                  const Icon = CATEGORY_ICONS[featured.category] ?? ServicesIcon;
                  return <Icon className="h-4 w-4" />;
                })()}
                {featured.keyword}
              </p>
            </div>
          </Link>

          {/* ── Grille ───────────────────────────────────────── */}
          {rest.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10 dark:border-white/10 dark:bg-black"
                >
                  <div className="flex items-center justify-between gap-3">
                    <CategoryBadge category={article.category} />
                    <ArrowUpRightIcon
                      className="h-5 w-5 text-black/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-yellow-500 dark:text-white/30"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="mt-4 font-display text-lg uppercase leading-tight tracking-wide transition-colors group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="mx-auto max-w-6xl bg-white px-4 py-16 text-center text-black/60 dark:bg-black dark:text-white/60 sm:px-6">
          Aucun article dans cet univers pour le moment.
        </p>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-yellow-500 py-14 text-black md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl uppercase leading-tight tracking-wide sm:text-3xl">
              Un projet après votre lecture ?
            </h2>
            <p className="mt-2 max-w-xl leading-relaxed text-black/75">
              Équipement, aménagement ou devis : transformez ce que vous venez
              d&apos;apprendre en projet concret avec IRONZ.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demande-devis"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-black px-7 py-4 font-display uppercase tracking-wide text-white transition-colors hover:bg-zinc-900"
            >
              Demander un devis
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/produit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-black px-7 py-4 font-display uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white"
            >
              Voir le catalogue
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
