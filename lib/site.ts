/**
 * Single source of truth for the public business identity.
 *
 * Every JSON-LD block (SportingGoodsStore, Organization, WebSite) must reuse
 * these constants so Google consolidates a single entity instead of several
 * "IRONZ" variants. If a phone number or social handle changes, update it
 * here only.
 *
 * Both numbers are published as business contacts. Which number is the
 * primary customer-service line, and whether the second number is
 * WhatsApp-enabled, remain to be confirmed with the client.
 */
export const SITE_URL = "https://www.ironz.ma";

export const SITE_PHONE = "+212674114446";

export const SITE_CONTACTS = [
  { telephone: SITE_PHONE, label: "+212 674 114 446", href: "tel:+212674114446" },
  { telephone: "+212669510042", label: "+212 669 510 042", href: "tel:+212669510042" },
] as const;

export const SITE_PHONES = SITE_CONTACTS.map((contact) => contact.telephone);
export const SITE_EMAIL = "info@ironz.ma";

// Confirmed location only. Existing shop-unit details remain unconfirmed.
export const SITE_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Sahara Mall",
  addressLocality: "Agadir",
  addressCountry: "MA",
} as const;

export const SOCIAL_URLS = [
  "https://www.instagram.com/ironz_official/",
  "https://www.youtube.com/@ironzofficial",
  "https://www.facebook.com/ironzpro",
];
