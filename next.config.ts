import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old ecosystem pages are gone; send their URLs to the Otis IDE page.
  async redirects() {
    return ["personal", "business", "ide", "ecosystem"].map((slug) => ({
      source: `/${slug}`,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
