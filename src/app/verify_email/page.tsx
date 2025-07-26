"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function VerifyEmail() {
	const router = useRouter();
	const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("token="))
			?.split("=")[1];

	async function verifyEmail() {
		// Check if the user is logged in by looking for a token in cookies
		if (!token) { // If no token is found, redirect to login
			router.push("/login");
			return;
		}
		const response = await fetch( // Fetching user data to check if email is verified
			`${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) { // user isn't well logged in
			router.push("/api/logout");
			return;
		}

		const data = await response.json();
		if (data.emailVerified) {
			// If email is already verified, we update the cookeis then redirect
			await fetch('/api/update-cookie', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			router.push("/dashboard");
		}
	}

	useEffect(() => {
		verifyEmail();
	});

	return (
		<div>
			<h1>Verify your email</h1>
			<p>Please check your inbox for a verification email.</p>

			<button type="button" onClick={() => {
				fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-email`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
			}}>
				Re-send verification email
			</button>
		</div>
	);
}
