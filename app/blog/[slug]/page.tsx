import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
} from "../../../lib/blog";
import type { BlogArticle } from "../../../lib/blog";

const SITE_URL = "https://www.ironz.ma";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then((resolved) => {
    const article = getArticleBySlug(resolved.slug);
    if (!article) return { title: "Article introuvable | IRONZ" };

    const url = `${SITE_URL}/blog/${article.slug}`;

    return {
      title: article.metaTitle,
      description: article.metaDescription,
      alternates: { canonical: `/blog/${article.slug}` },
      robots: { index: true, follow: true },
      openGraph: {
        title: article.metaTitle,
        description: article.metaDescription,
        url,
        siteName: "IRONZ",
        locale: "fr_MA",
        type: "article",
        publishedTime: article.date,
        images: OG_LOGO_IMAGES,
      },
      twitter: {
        card: "summary_large_image",
        title: article.metaTitle,
        description: article.metaDescription,
        images: TWITTER_LOGO_IMAGES,
        creator: "@ironz_official",
      },
    };
  });
}

function buildStructuredData(article: BlogArticle) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const datePublished = new Date(article.date).toISOString();

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: SITE_URL,
        },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        {
          "@type": "ListItem",
          position: 3,
          name: article.category,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      url,
      inLanguage: "fr-MA",
      datePublished,
      dateModified: datePublished,
      keywords: article.keyword,
      articleSection: article.category,
      publisher: {
        "@type": "Organization",
        name: "IRONZ",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-optimized.png`,
        },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * List items use a restricted inline markup authored in `lib/blog`
 * (`<strong>…</strong>` only). Rendered as real elements so tags never
 * leak as visible text. Content is static and in-house — no user input.
 */
function renderRichText(source: string, key: number) {
  const parts = source.split(/<strong>(.*?)<\/strong>/g);
  return (
    <span key={key}>
      {parts.map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
      )}
    </span>
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);
  const structuredData = buildStructuredData(article);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── Fil d'Ariane ───────────────────────────────────── */}
      <nav aria-label="Fil d'Ariane" className="mb-10">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>
            <Link
              href="/blog"
              className="hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="font-medium text-gray-900 dark:text-white">
            {article.category}
          </li>
        </ol>
      </nav>

      {/* ── En-tête ────────────────────────────────────────── */}
      <header className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
            {article.category}
          </span>
        </div>
        <h1 className="mb-8 font-display text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
          {article.title}
        </h1>
        {article.intro.map((paragraph, index) => (
          <p
            key={index}
            className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
          >
            {paragraph}
          </p>
        ))}
      </header>

      {/* ── Sections ───────────────────────────────────────── */}
      {article.sections.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
            {section.h2}
          </h2>
          {section.paragraphs?.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {paragraph}
            </p>
          ))}
          {section.list && section.list.length > 0 && (
            <ul className="ml-6 list-disc space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {section.list.map((item, lIndex) => (
                <li key={lIndex}>{renderRichText(item, lIndex)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
          Questions fréquentes
        </h2>
        <div className="space-y-6">
          {article.faq.map((item, index) => (
            <div key={index}>
              <h3 className="mb-2 font-display text-lg tracking-wide text-gray-900 dark:text-white">
                {item.q}
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="mb-12">
        <Link
          href={article.cta.href}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-4 font-display text-base font-bold uppercase tracking-widest text-black transition-all hover:bg-yellow-500"
        >
          {article.cta.label}
        </Link>
      </section>

      {/* ── Articles liés ─────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 pt-12 dark:border-gray-800">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-wide">
            À lire aussi
          </h2>
          <ul className="space-y-4">
            {related.map((relatedArticle) => (
              <li key={relatedArticle.slug}>
                <Link
                  href={`/blog/${relatedArticle.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-gray-200 p-4 transition-colors hover:border-yellow-400 dark:border-gray-800 dark:hover:border-yellow-400"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                    {relatedArticle.category}
                  </span>
                  <span className="font-display text-lg uppercase leading-tight tracking-wide text-gray-900 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-400">
                    {relatedArticle.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
