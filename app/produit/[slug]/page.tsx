// app/produit/[slug]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import ProductDetailClient from "./page-client";

// ─── TYPES ───────────────────────────────────────────────
interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  images?: string[];
  slug?: string;
  category?: string;
  subCategory?: string;
  description?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  discount?: number;
  inStock?: boolean;
  stockQuantity?: number;
  tags?: string[];
  sku?: string;
  warranty?: string;
  weight?: string;
  dimensions?: string;
  material?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api";

// ─── HELPERS ─────────────────────────────────────────────
function getImageUrl(image?: string): string {
  if (!image) return "https://ironz.ma/og-default.jpg";
  if (image.startsWith("http")) return image;
  return `https://res.cloudinary.com/dypjgpisl/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/${image}`;
}

function getProductId(product: Product): string {
  return product._id || product.id || "";
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + "...";
}

// ─── FETCH PRODUCT (server-side) ─────────────────────────
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products?slug=${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const products = data.data || data.products || data || [];
    return (
      products.find((p: Product) => p.slug === slug) || products[0] || null
    );
  } catch {
    return null;
  }
}

// ─── FETCH RELATED PRODUCTS ──────────────────────────────
async function getRelatedProducts(
  category?: string,
  excludeSlug?: string
): Promise<Product[]> {
  try {
    const query = category ? `category=${encodeURIComponent(category)}&` : "";
    const res = await fetch(`${API_URL}/products?${query}limit=8`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const products: Product[] = data.data || data.products || data || [];
    return products.filter((p) => p.slug !== excludeSlug).slice(0, 4);
  } catch {
    return [];
  }
}

// ─── GENERATE STATIC PARAMS ──────────────────────────────
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/products?limit=1000`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const products: Product[] = data.data || data.products || data || [];
    return products
      .filter((p) => p.slug)
      .map((p) => ({ slug: p.slug as string }));
  } catch {
    return [];
  }
}

// ─── DYNAMIC METADATA ────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Produit introuvable | IRONZ",
      description: "Ce produit n'existe plus ou a été déplacé.",
      robots: { index: false, follow: false },
      alternates: { canonical: "https://ironz.ma/produit" },
    };
  }

  const productName = product.name;
  const title = `${productName} | IRONZ - Équipement Sportif Premium`;

  const rawDescription = product.description
    ? product.description.replace(/<[^>]*>/g, "").trim()
    : "";

  const description = rawDescription
    ? truncate(rawDescription, 160)
    : `Achetez ${productName} au meilleur prix au Maroc chez IRONZ. ${
        product.brand ? `Marque : ${product.brand}. ` : ""
      }${
        product.category ? `Catégorie : ${product.category}. ` : ""
      }Livraison rapide 24-48h. Garantie incluse.`;

  const canonicalUrl = `https://ironz.ma/produit/${product.slug || params.slug}`;
  const imageUrl = getImageUrl(product.image);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : product.discount || 0;

  const keywords = [
    productName,
    product.brand,
    product.category,
    product.subCategory,
    product.sku ? `SKU ${product.sku}` : null,
    "équipement sportif maroc",
    "matériel fitness maroc",
    "livraison maroc",
    "IRONZ",
    ...(product.tags || []),
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "IRONZ", url: "https://ironz.ma" }],
    creator: "IRONZ",
    publisher: "IRONZ",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "IRONZ",
      locale: "fr_MA",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${productName} - IRONZ Équipement Sportif`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@ironzmaroc",
      site: "@ironzmaroc",
    },
    other: {
      // Open Graph Product (Facebook / Meta)
      "product:price:amount": String(product.price),
      "product:price:currency": "MAD",
      "product:availability": product.inStock ? "in stock" : "out of stock",
      "product:condition": "new",
      ...(product.brand && { "product:brand": product.brand }),
      ...(product.category && { "product:category": product.category }),
      ...(product.sku && { "product:retailer_item_id": product.sku }),
      ...(discount > 0 && {
        "product:sale_price:amount": String(product.price),
        "product:original_price:amount": String(product.oldPrice),
        "product:original_price:currency": "MAD",
      }),
    },
  };
}

// ─── JSON-LD SCHEMA ───────────────────────────────────────
function JsonLd({ product, params }: { product: Product; params: { slug: string } }) {
  const productId = getProductId(product);
  const canonicalUrl = `https://ironz.ma/produit/${product.slug || params.slug}`;
  const imageUrl = getImageUrl(product.image);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Product Schema ──────────────────────────────
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: product.name,
        description: product.description
          ? product.description.replace(/<[^>]*>/g, "").trim()
          : `${product.name} - Équipement sportif premium chez IRONZ Maroc`,
        url: canonicalUrl,
        image: [imageUrl, ...(product.images || []).map(getImageUrl)].slice(0, 5),
        sku: product.sku || productId,
        mpn: product.sku || productId,
        ...(product.brand && {
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
        }),
        ...(product.category && {
          category: product.category,
        }),
        ...(product.material && { material: product.material }),
        ...(product.color && { color: product.color }),
        ...(product.weight && { weight: product.weight }),
        ...(product.warranty && {
          warranty: {
            "@type": "WarrantyPromise",
            durationOfWarranty: product.warranty,
          },
        }),
        ...(product.rating && product.reviewCount && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }),
        offers: {
          "@type": "Offer",
          url: canonicalUrl,
          priceCurrency: "MAD",
          price: product.price,
          ...(discount > 0 && {
            priceValidUntil: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString().split("T")[0],
          }),
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "IRONZ",
            url: "https://ironz.ma",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: 0,
              currency: "MAD",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "MA",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 3,
                unitCode: "DAY",
              },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "MA",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 14,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
        },
      },

      // ── BreadcrumbList Schema ───────────────────────
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://ironz.ma",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Produits",
            item: "https://ironz.ma/produit",
          },
          ...(product.category
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: product.category,
                  item: `https://ironz.ma/produit?category=${encodeURIComponent(product.category)}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: product.name,
                  item: canonicalUrl,
                },
              ]
            : [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: product.name,
                  item: canonicalUrl,
                },
              ]),
        ],
      },

      // ── WebPage Schema ──────────────────────────────
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${product.name} | IRONZ`,
        description: product.description || product.name,
        inLanguage: "fr-MA",
        dateModified: product.updatedAt || product.createdAt,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ironz.ma",
          url: "https://ironz.ma",
          name: "IRONZ",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      },

      // ── Organization Schema ─────────────────────────
      {
        "@type": "Organization",
        "@id": "https://ironz.ma#organization",
        name: "IRONZ",
        url: "https://ironz.ma",
        logo: {
          "@type": "ImageObject",
          url: "https://ironz.ma/logo.png",
          width: 200,
          height: 60,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["French", "Arabic"],
          areaServed: "MA",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
        },
        sameAs: [
          "https://www.instagram.com/ironzmaroc",
          "https://www.facebook.com/ironzmaroc",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── LOADING SKELETON ─────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
              {i < 2 && <div className="h-3 w-2 bg-gray-100 dark:bg-gray-700 rounded" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Image skeleton */}
          <div className="space-y-3">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </div>
            <div className="h-10 w-40 bg-yellow-200 dark:bg-yellow-900/30 rounded-xl" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded" />
              ))}
            </div>
            <div className="h-12 w-full bg-yellow-400/40 rounded-xl" />
            <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NOT FOUND ────────────────────────────────────────────
function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          Produit introuvable
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Ce produit n&apos;existe plus ou a été déplacé. Découvrez notre
          catalogue complet.
        </p>
        <a
          href="/produit"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Voir tous les produits
        </a>
      </div>
    </div>
  );
}

// ─── PAGE (Server Component) ──────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch produit + produits liés en parallèle
  const [product, relatedProducts] = await Promise.all([
    getProduct(params.slug),
    getProduct(params.slug).then((p) =>
      p ? getRelatedProducts(p.category, params.slug) : []
    ),
  ]);

  return (
    <>
      {/* JSON-LD uniquement si produit trouvé */}
      {product && <JsonLd product={product} params={params} />}

      <Suspense fallback={<LoadingSkeleton />}>
        <ProductDetailClient
          slug={params.slug}
          initialProduct={product}
          initialRelated={relatedProducts}
        />
      </Suspense>
    </>
  );
}