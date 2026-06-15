import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // GNews article images
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
