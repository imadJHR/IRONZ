export default function robots() {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/ironz-setup", "/checkout", "/api/"],
      },
      sitemap: "https://www.ironz.ma/sitemap.xml",
    }
  }
