/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'addasmriti.com', 's3.amazonaws.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.addasmriti.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
  experimental: {
    serverActions: true,
  },
}
module.exports = nextConfig
