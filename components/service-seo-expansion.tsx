import Link from "next/link";

type ServiceIconName =
  | "layout"
  | "dumbbell"
  | "equipment"
  | "zones"
  | "surface"
  | "home"
  | "cardio"
  | "dimensions"
  | "facility"
  | "users"
  | "palette"
  | "badge"
  | "layers"
  | "sliders"
  | "activity"
  | "maintenance";

type ServiceSeoCard = {
  icon: ServiceIconName;
  title: string;
  text: string;
};

type ServiceSeoProcessStep = {
  title: string;
  text: string;
};

type ServiceSeoLink = {
  href: string;
  label: string;
  text: string;
};

type ServiceSeoFaq = {
  question: string;
  answer: string;
};

type ServiceSchema = {
  url: string;
  serviceName: string;
  serviceType: string;
  description: string;
  breadcrumbs?: Array<{ name: string; item: string }>;
};

type ServiceSeoExpansionProps = {
  eyebrow: string;
  title: string;
  intro: string[];
  decisionTitle: string;
  decisionIntro: string;
  decisionCards: ServiceSeoCard[];
  processTitle: string;
  processIntro: string;
  processSteps: ServiceSeoProcessStep[];
  linksTitle: string;
  linksIntro: string;
  links: ServiceSeoLink[];
  faqTitle: string;
  faqs: ServiceSeoFaq[];
  schema?: ServiceSchema;
};

const iconPaths: Record<ServiceIconName, React.ReactNode> = {
  layout: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 10h16M10 10v10M15 4v6" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M5 8v8M8 7v10M16 7v10M19 8v8" />
      <path d="M8 12h8" />
      <path d="M3 10v4M21 10v4" />
    </>
  ),
  equipment: (
    <>
      <rect x="5" y="6" width="14" height="9" rx="2" />
      <path d="M8 19h8M12 15v4M8 9h8M8 12h5" />
    </>
  ),
  zones: (
    <>
      <path d="M4 5h7v6H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 13h7v6H4z" />
    </>
  ),
  surface: (
    <>
      <path d="M4 17l8 4 8-4" />
      <path d="M4 12l8 4 8-4-8-4-8 4z" />
      <path d="M12 8V3" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  cardio: (
    <>
      <path d="M4 13h3l2-5 4 10 2-5h5" />
      <path d="M6 20h12" />
    </>
  ),
  dimensions: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 16h8M8 8v8M16 8v8" />
      <path d="M6 12h12" />
    </>
  ),
  facility: (
    <>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M8 20v-6h8v6" />
      <path d="M8 10h8" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c1-4 4-6 6-6s5 2 6 6" />
      <path d="M15 11a3 3 0 1 0 0-6" />
      <path d="M17 14c2 .6 3.3 2.5 4 6" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 0 0 0 18h2a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.3-3.1H18a6 6 0 0 0 0-12z" />
      <circle cx="8" cy="10" r="1" />
      <circle cx="11" cy="7" r="1" />
      <circle cx="15" cy="8" r="1" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
      <path d="M8.5 12h7M10 9.5h4M10 14.5h4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 6h14M5 12h14M5 18h14" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="11" cy="18" r="2" />
    </>
  ),
  activity: (
    <>
      <path d="M6 18c4-1 5-5 6-10" />
      <path d="M12 8c2 4 4 7 8 8" />
      <circle cx="12" cy="5" r="2" />
      <path d="M4 21h16" />
    </>
  ),
  maintenance: (
    <>
      <path d="M14 7l3-3 3 3-3 3z" />
      <path d="M4 20l8-8" />
      <path d="M6 6h6v6H6z" />
      <path d="M15 15h5v5h-5z" />
    </>
  ),
};

function ServiceInlineIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7"
    >
      {iconPaths[name]}
    </svg>
  );
}

export default function ServiceSeoExpansion({
  eyebrow,
  title,
  intro,
  decisionTitle,
  decisionIntro,
  decisionCards,
  processTitle,
  processIntro,
  processSteps,
  linksTitle,
  linksIntro,
  links,
  faqTitle,
  faqs,
  schema,
}: ServiceSeoExpansionProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceJsonLd = schema
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: schema.serviceName,
        serviceType: schema.serviceType,
        provider: {
          "@type": "Organization",
          name: "IRONZ",
          url: "https://www.ironz.ma/",
        },
        areaServed: "Maroc",
        url: schema.url,
        description: schema.description,
      }
    : null;

  const breadcrumbJsonLd = schema?.breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: schema.breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      }
    : null;

  return (
    <>
      {serviceJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      ) : null}
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-display uppercase tracking-[0.25em] text-yellow-600 dark:text-yellow-400">
              {eyebrow}
            </span>
            <h2 className="mt-6 text-3xl md:text-5xl font-display uppercase tracking-wide text-gray-900 dark:text-white">
              {title}
            </h2>
            <div className="mt-6 space-y-4 text-left md:text-center text-gray-600 dark:text-gray-300 leading-relaxed">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start mb-12">
            <div className="rounded-3xl bg-gray-950 text-white p-7 md:p-9 border border-white/10">
              <p className="text-sm font-display uppercase tracking-[0.25em] text-yellow-500 mb-4">
                Décision projet
              </p>
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wide mb-4">
                {decisionTitle}
              </h3>
              <p className="text-gray-300 leading-relaxed">{decisionIntro}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {decisionCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500 text-black">
                    <ServiceInlineIcon name={card.icon} />
                  </div>
                  <h3 className="text-lg font-display uppercase tracking-wide text-gray-900 dark:text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="rounded-3xl border border-gray-100 dark:border-gray-800 p-7 md:p-8 bg-white dark:bg-gray-900">
              <h3 className="text-2xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                {processTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{processIntro}</p>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-black font-display">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h4 className="font-display uppercase tracking-wide text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-400 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-7 md:p-8 border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-display uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                {linksTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{linksIntro}</p>
              <div className="space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block rounded-2xl bg-white dark:bg-gray-950 p-5 border border-gray-100 dark:border-gray-800 hover:border-yellow-500/60 transition-colors"
                  >
                    <span className="font-display uppercase tracking-wide text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      {link.label}
                    </span>
                    <span className="mt-2 block text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {link.text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gray-950 text-white p-7 md:p-10">
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wide mb-8">
              {faqTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h4 className="font-display uppercase tracking-wide text-yellow-500 mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
