import { useEffect, useRef } from "react";
import Image from "next/image";

interface ButtonGoogleCustomProps {
	onSuccess: (accessToken: string) => void;
	onError?: (error: Error) => void;
	text?: string;
}

declare global {
	interface Window {
		google?: {
			accounts: {
				oauth2: {
					initTokenClient: (options: {
						client_id: string;
						scope: string;
						callback: (response: {
							access_token: string;
							error?: string;
						}) => void;
					}) => {
						requestAccessToken: () => void;
					};
				};
			};
		};
	}
}

export default function ButtonGoogleCustom({
	onSuccess,
	onError,
	text
}: ButtonGoogleCustomProps) {
	type InitTokenClientType = {
		requestAccessToken: () => void;
	};

	const tokenClientRef = useRef<InitTokenClientType | null>(null);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		script.onload = () => {
			if (!window.google) {
				onError?.(new Error("Google Identity Services not loaded"));
				return;
			}

			const tokenClient = window.google.accounts.oauth2.initTokenClient({
				client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
				scope: "openid email profile",
				callback: (response) => {
					if (response.access_token) {
						onSuccess(response.access_token);
					} else {
						onError?.(
							new Error(response.error || "Access token error")
						);
					}
				},
			});

			tokenClientRef.current = tokenClient;
		};

		return () => {
			document.body.removeChild(script);
		};
	}, [onSuccess, onError]);

	const handleClick = () => {
		if (!tokenClientRef.current) {
			onError?.(new Error("Token client not ready"));
			return;
		}
		tokenClientRef.current.requestAccessToken();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-900 border border-gray-300 hover:bg-gray-50 focus:outline-indigo-600 focus:outline-2 focus:-outline-offset-2 sm:text-sm font-semibold"
		>
			<Image
				src="/icons8-google.svg" // assure-toi qu’il est dans /public
				alt="Google Icon"
				width={24}
				height={24}
			/>
			<span>{text || "Sign in with Google"}</span>
		</button>
	);
}
