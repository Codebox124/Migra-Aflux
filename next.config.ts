/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // For Next.js 13+ (recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'migra.buyjet.ng',
        port: '',
        pathname: '/**',
      },
    ],
    // For Next.js 12 and earlier (legacy)
    // domains: ['migra.buyjet.ng'],
  },
}

module.exports = nextConfig