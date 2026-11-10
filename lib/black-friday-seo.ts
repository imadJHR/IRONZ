import { BLACK_FRIDAY_PACKS, type BlackFridayPack } from "./black-friday";
import { SITE_URL } from "./site";

export function blackFridayProductSchema(pack: BlackFridayPack) {
  const url = `${SITE_URL}/produit/${pack.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: pack.name,
    description: pack.description,
    category: "Packs de nutrition sportive",
    image: [`${SITE_URL}${pack.image}`],
    url,
    offers: {
      "@type": "Offer",
      url,
      price: pack.price.toFixed(2),
      priceCurrency: "MAD",
      availability: pack.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "IRONZ", url: SITE_URL },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "MAD" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "MA" },
      },
    },
  };
}

export function blackFridayBreadcrumbs(pack?: BlackFridayPack) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Black Friday", item: `${SITE_URL}/black-friday` },
      ...(pack ? [{ "@type": "ListItem", position: 3, name: pack.name, item: `${SITE_URL}/produit/${pack.slug}` }] : []),
    ],
  };
}

export function blackFridayCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/black-friday#collection`,
    name: "Packs Black Friday de nutrition sportive au Maroc",
    description: "Six packs de nutrition sportive avec whey, créatine, crème de riz, gainer ou vitamines. Livraison gratuite au Maroc.",
    url: `${SITE_URL}/black-friday`,
    inLanguage: "fr-MA",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: BLACK_FRIDAY_PACKS.length,
      itemListElement: BLACK_FRIDAY_PACKS.map((pack, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pack.name,
        url: `${SITE_URL}/produit/${pack.slug}`,
      })),
    },
  };
}
