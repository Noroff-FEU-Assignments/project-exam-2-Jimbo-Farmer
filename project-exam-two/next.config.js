/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// }