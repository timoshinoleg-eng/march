/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // ← ДОБАВЛЕНО для Docker
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    unoptimized: true,  // ← ДОБАВЛЕНО для совместимости
  },

  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
    {
      source: '/(favicon.png|manifest.json|robots.txt|sitemap.xml)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=86400' }],
    },
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],

  redirects: async () => [
    { source: '/home', destination: '/', permanent: true },
  ],
};

module.exports = nextConfig;
