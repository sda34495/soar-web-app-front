import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async function () {
    return [
      {
        source: "/api/(.*)",
        destination: "http://54.80.43.90:8082/api/$1",
      },
    ];
  },
};

export default nextConfig;
