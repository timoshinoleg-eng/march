/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Убрано для работы API routes на Vercel
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
