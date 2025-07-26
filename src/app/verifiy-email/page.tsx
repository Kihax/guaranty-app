import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function VerifyEmail() {
	const router = useRouter();

	async function verifyEmail() {
		const cookiesStore = await cookies();
		const token = cookiesStore.get("token")?.value;
		if (!token) {
			router.push("/login");
			return;
		}
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			cookiesStore.delete("token");
			cookiesStore.delete("emailVerified");
			router.push("/login");
			return;
		}

		const data = await response.json();
		if (data.emailVerified) {
			cookiesStore.set("emailVerified", "true");
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
		</div>
	);
}
