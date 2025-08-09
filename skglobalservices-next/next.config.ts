import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  images: { unoptimized: false },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
