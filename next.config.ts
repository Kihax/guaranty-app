import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://www.googleapis.com https://accounts.google.com https://content.googleapis.com;
  frame-src https://accounts.google.com https://content.googleapis.com;
  frame-ancestors 'self';
  object-src 'none';
`;

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)", // applique à toutes les routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;