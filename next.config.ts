import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    // Optimize for better performance
    optimizePackageImports: ["react-bootstrap", "bootstrap"],
  },
  images: { unoptimized: false },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize bundle
  webpack: (config, { dev, isServer }) => {
    // Optimize imports
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": "./src",
      };
    }
    return config;
  },
};

// Use the default next-intl plugin configuration
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
