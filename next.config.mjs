/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained `.next/standalone` server build so the Docker
  // image only needs to copy the standalone output instead of node_modules.
  // See: https://nextjs.org/docs/app/api-reference/next-config-js/output
  output: "standalone",

  // Strict React + sane defaults
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
