import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      script-src 'self' 'unsafe-inline' https://apis.google.com https://www.gstatic.com https://accounts.google.com;
      frame-src https://accounts.google.com;
      connect-src 'self' https://accounts.google.com https://www.googleapis.com;
      img-src 'self' data: https://*.googleusercontent.com;
    `.replace(/\s{2,}/g, " ").trim()
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;