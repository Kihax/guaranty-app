import type { Metadata } from "next";
import { ThemeProvider } from "../components/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
	title: "Guaranty",
	description: "Manage your warranties effortlessly",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
      <head>
      </head>
			<body>
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
