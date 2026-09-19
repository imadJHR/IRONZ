import type { Metadata } from "next";

/**
 * Official IRONZ logo, used as the global default social preview image.
 *
 * Pages without an intentional page-specific social image fall back to this
 * asset. Absolute production URL so Open Graph / Twitter consumers can fetch
 * it without relying on `metadataBase` resolution.
 */
export const OG_LOGO_URL = "https://www.ironz.ma/logo-optimized.png";

export const OG_LOGO_IMAGES: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [
  {
    url: OG_LOGO_URL,
    width: 540,
    height: 675,
    alt: "IRONZ - Équipements Professionnels",
    type: "image/png",
  },
];

export const TWITTER_LOGO_IMAGES: NonNullable<Metadata["twitter"]>["images"] = [
  OG_LOGO_URL,
];
