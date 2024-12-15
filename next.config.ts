import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async function () {
    return [
      {
        source: "/api/:path*",
        destination: "http://54.80.43.90:8082/api/:path*",
      },
    ];
  },
};

export default nextConfig;
