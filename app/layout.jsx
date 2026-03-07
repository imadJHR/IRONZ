import React from "react";
import ClientLayout from "./ClientLayout";
import Script from "next/script"; // 1. Import Script component

export const metadata = {
  title: "IRONZ- Équipements Professionnels et Matériaux",
  description:
    "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
  keywords:
    "équipements professionnels, matériaux de construction, fitness, musculation, arts martiaux, Maroc, ironz",
  authors: [{ name: "IRONZ PRO", url: "https://ironz.ma" }],
  metadataBase: new URL("https://ironz.ma"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/public/logo.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "IRONZ PRO - Équipements Professionnels et Matériaux",
    description:
      "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
    url: "https://ironz.ma",
    siteName: "IRONZ PRO",
    images: [
      {
        url: "https://www.instagram.com/p/DIW2nZtsx3S/",
        width: 1200,
        height: 630,
        alt: "IRONZ PRO - Équipements Professionnels",
      },
      {
        url: "/public/instagram-image.jpg",
        width: 1080,
        height: 1080,
        alt: "IRONZ PRO - Équipements Professionnels",
      },
    ],
    locale: "fr_MA",
    type: "website",
    facebook: {
      appId: "your-facebook-app-id", // Ensure you replace this if you have one
    },
  },
  facebook: {
    domainVerification: "bhglqyk56ty0ilu2xcfi7ok1pew1f2",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    yandex: "your-yandex-verification-code",
  },
  other: {
    "instagram:creator": "@ironz_equipements",
    "instagram:site": "@ironz_official",
    "facebook-domain-verification": "bhglqyk56ty0ilu2xcfi7ok1pew1f2",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {/* 2. Facebook Pixel Script */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2235692166803820');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* 3. NoScript Fallback (for users with JS disabled) */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2235692166803820&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {children}
    </ClientLayout>
  );
}