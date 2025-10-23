import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // TODO: Uncomment this when deploying via docker
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
