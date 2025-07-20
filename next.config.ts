import type { NextConfig } from "next";

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // toutes les routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https://apis.google.com https://accounts.google.com https://www.gstatic.com 'unsafe-inline';
              connect-src 'self' https://accounts.google.com https://www.googleapis.com;
              frame-src https://accounts.google.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://*.googleusercontent.com;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;