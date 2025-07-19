"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

export default function GoogleButton() {
	useEffect(() => {
		if (!window.google) return;
        console.log("Origin:", window.location.origin);
		window.google.accounts.id.initialize({
			client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			callback: (response) => {
				console.log("ID Token", response.credential);

				fetch(
					process.env.NEXT_PUBLIC_API_URL + "/auth/login-with-google",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ idToken: response.credential }),
					}
				);
			},
		});
	}, []);

	const handleClick = () => {
		if (window.google?.accounts?.id) {
			window.google.accounts.id.prompt();
		}
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
			<span>Sign in with Google</span>
		</button>
	);
}
