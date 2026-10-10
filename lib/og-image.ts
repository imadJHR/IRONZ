import type { Metadata } from "next";

/**
 * Default social preview image (landscape 1200x630 for summary_large_image).
 *
 * Pages without an intentional page-specific social image fall back to this
 * asset. Absolute production URL so Open Graph / Twitter consumers can fetch
 * it without relying on `metadataBase` resolution.
 *
 * The logo remains available as OG_LOGO_URL for JSON-LD `logo` usage only,
 * never as a share image (portrait format gets cropped on social networks).
 */
export const OG_LOGO_URL = "https://www.ironz.ma/logo-optimized.png";
export const OG_DEFAULT_URL = "https://www.ironz.ma/og-image.jpg";

export const OG_LOGO_IMAGES: NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> = [
  {
    url: OG_DEFAULT_URL,
    width: 1200,
    height: 630,
    alt: "IRONZ - Équipement fitness et musculation au Maroc",
    type: "image/jpeg",
  },
];

export const TWITTER_LOGO_IMAGES: NonNullable<Metadata["twitter"]>["images"] = [
  OG_DEFAULT_URL,
];
