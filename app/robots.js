export default function robots() {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/checkout/", "/api/"],
      },
      sitemap: "https://ironz.ma/sitemap.xml",
    }
  }
  