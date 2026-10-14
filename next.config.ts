import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2dkmedia.dentalkart.com",
      },
      {
        protocol: "https",
        hostname: "www.dentalkart.com",
      },
      {
        protocol: "https",
        hostname: "images.dentalkart.com",
      },
    ],
  },
};

export default nextConfig;
