import Link from "next/link";
import { OG_LOGO_URL } from "../../lib/og-image";

// IRONZ's organizational authorship was confirmed by the site owner.
// Authorship and publication remain separate roles, even for the same entity.
export const EDITORIAL_AUTHOR = {
  "@type": "Organization",
  name: "IRONZ",
  url: "https://www.ironz.ma/a-propos",
} as const;

export const EDITORIAL_PUBLISHER = {
  "@type": "Organization",
  name: "IRONZ",
  logo: { "@type": "ImageObject", url: OG_LOGO_URL },
} as const;

export function EditorialCredit() {
  return (
    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Par{" "}
      <Link
        href={EDITORIAL_AUTHOR.url}
        rel="author"
        className="underline underline-offset-4 hover:text-yellow-600 dark:hover:text-yellow-400"
      >
        {EDITORIAL_AUTHOR.name}
      </Link>
    </p>
  );
}
