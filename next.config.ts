import type { NextConfig } from "next";

const nextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)", // Appliqué à toutes les routes
				headers: [
					{
						key: "Content-Security-Policy",
						value:
							"script-src 'self' https://apis.google.com https://www.gstatic.com; " +
							"frame-src https://accounts.google.com; " +
							"connect-src https://accounts.google.com https://www.googleapis.com; " +
							"style-src 'self' 'unsafe-inline';", // si besoin
					},
				],
			},
		];
	},
};

export default nextConfig;
