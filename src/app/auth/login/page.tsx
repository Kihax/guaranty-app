"use client";

import "../../globals.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleButton from "../../lib/GoogleButton";
import { useRouter } from 'next/navigation';


export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	// erreurs par champ
	const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>(
		{}
	);

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFieldErrors({}); // reset erreurs avant chaque soumission

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				const token = data.token;

				await fetch("/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
				});

				router.replace("/dashboard"); // Redirect to dashboard after successful login
			} else if (res.status === 422) {
				if (data.errors && Array.isArray(data.errors)) {
					// construire un objet avec field => message
					const errorsObj: { [key: string]: string } = {};
					type FieldError = { field: string; message: string };
					data.errors.forEach((err: FieldError) => {
						if (err.field) {
							errorsObj[err.field] = err.message;
						}
					});
					setFieldErrors(errorsObj);
				} else {
					setFieldErrors({
						general: "Erreur de validation inconnue",
					});
				}
			} else {
				setFieldErrors({
					general: data.message || "Une erreur est survenue",
				});
			}
		} catch {
			setFieldErrors({ general: "Erreur réseau, veuillez réessayer." });
		}
	};

	return (
		<section className="bg-gray-100 flex min-h-screen items-center justify-center overflow-hidden">
			
			<div className="xl:w-1/2 md:w-2/3 w-full h-screen p-10 flex flex-col justify-center">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						alt="Your Company"
						src="/logo.png"
						className="mx-auto h-10 w-auto"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleSubmit}
						action="#"
						method="POST"
						className="space-y-6"
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
										fieldErrors.email
											? "outline-red-600"
											: ""
									}`}
								/>
								{fieldErrors.email && (
									<p className="mt-1 text-sm text-red-600">
										{fieldErrors.email}
									</p>
								)}
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										href="/auth/forgot-password"
										className="font-semibold text-indigo-600 hover:text-indigo-500"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
									autoComplete="current-password"
									className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
										fieldErrors.password
											? "outline-red-600"
											: ""
									}`}
								/>
								{fieldErrors.password && (
									<p className="mt-1 text-sm text-red-600">
										{fieldErrors.password}
									</p>
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>

						{/* Afficher une erreur générale, si besoin */}
						{fieldErrors.general && (
							<p className="text-center text-red-600 text-sm mt-2">
								{fieldErrors.general}
							</p>
						)}
					</form>

					<p className="mt-3 text-center text-sm/6 text-gray-500">
						Not a member?{" "}
						<Link
							href="/auth/register"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Start
						</Link>
					</p>

					<div className="mt-6">
						<GoogleButton onSuccess={(idToken) => {
							fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-with-google`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({ idToken }),
							})
								.then((res) => res.json())
								.then((data) => {
									console.log(data)
									if (data.token) {
										fetch("/api/login", {
											method: "POST",
											headers: {
												"Content-Type": "application/json",
											},
											body: JSON.stringify({
												token: data.token,
											}),
										}).then((res) => {
											console.log("Login successful", res)
											router.replace("/dashboard"); // Redirect to dashboard after successful login
										});
									} else {
										setFieldErrors({
											general: data.message || "Login failed",
										});
									}
								})
								.catch((error) => {
									setFieldErrors({
										general: error.message || "Network error",
									});
								});
						}} onError={(error) => console.error(error)} />
					</div>
				</div>
			</div>

			<div className="xl:w-1/2 md:w-1/3 w-0 py-5 xl:pl-5 md:pl-2 h-screen ">
				<Image
					className="h-full w-full object-cover  rounded-l-2xl"
					src="/login2.avif"
					alt="Cloud with docs"
					width={900}
					height={2000}
				/>
			</div>
		</section>
	);
}
