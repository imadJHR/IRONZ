/**
 * Single source of truth for the public business identity.
 *
 * Every JSON-LD block (SportingGoodsStore, Organization, WebSite) must reuse
 * these constants so Google consolidates a single entity instead of several
 * "IRONZ" variants. If a phone number or social handle changes, update it
 * here only.
 *
 * NOTE: please verify that +212674114446 is the canonical customer-service
 * line (it is the number used on contact/FAQ/services pages). The footer
 * historically displayed +212669510042 as a secondary line.
 */
export const SITE_URL = "https://www.ironz.ma";

export const SITE_PHONE = "+212674114446";

export const SOCIAL_URLS = [
  "https://www.instagram.com/ironz_official/",
  "https://www.youtube.com/@ironzofficial",
  "https://www.facebook.com/ironzpro",
];
