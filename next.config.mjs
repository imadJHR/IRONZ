/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            { source: '/product', destination: '/produit', permanent: true },
            { source: '/produits', destination: '/produit', permanent: true },
            { source: '/produits/:slug', destination: '/produit/:slug', permanent: true },
            { source: '/services/amenagement-salle/professionnelle', destination: '/services/amenagement-salle/salle-professionnelle', permanent: true },
            { source: '/services/amenagement-salle/hotelier', destination: '/services/amenagement-salle/salle-professionnelle', permanent: true },
            { source: '/services/amenagement-salle/reeducation', destination: '/services/amenagement-salle/salle-professionnelle', permanent: true },
            { source: '/promotions', destination: '/produit', permanent: true },
            { source: '/favoris', destination: '/produit', permanent: true },
            { source: '/services/conception-produits', destination: '/services/personnalisation-accessoires', permanent: true },
        ];
    },
    images: {
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
        qualities: [45, 60],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
