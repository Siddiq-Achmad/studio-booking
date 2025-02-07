import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    remotePatterns : [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'luxima.id',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.luxima.id',
        port: '',
        pathname: '/**',
      }
    ]
  },
  reactStrictMode: true,
};

export default nextConfig;
