/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  presets: ["next/babel"],
  images: {
    domains: ['api.partzrider.com', 'api.partzrider.com', 'admin.partzrider.com'],
  }
}

module.exports = nextConfig
