import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "www.google.com" },
      { hostname: "i.pravatar.cc" },
      { hostname: "randomuser.me" },
    ],
  },
};

export default nextConfig;
