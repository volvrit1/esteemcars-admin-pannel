import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "69.62.66.51",
      },
      {
        protocol: "https",
        hostname: "69.62.66.51",
      },
      {
        protocol: "http",
        hostname: `${process.env.ROW_URL}`,
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
