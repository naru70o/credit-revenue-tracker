import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/default-path", // Replace with your desired default path
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
