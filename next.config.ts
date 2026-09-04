import type { NextConfig } from "next";

// Repo is a GitHub Pages *project* site (danielmejiadev.github.io/portfolio),
// so built assets need the /portfolio prefix — but only for that deployed
// build, never for local dev/preview.
const basePath = process.env.GITHUB_ACTIONS ? "/portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
