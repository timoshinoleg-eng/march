/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убрано output: 'export' для работы API routes
  // distDir убран — используем стандартный .next для Vercel
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
