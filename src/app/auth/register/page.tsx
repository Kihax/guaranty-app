"use client";

import "../../globals.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleButton from "../../lib/GoogleButton";
import { useRouter } from "next/navigation";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const router = useRouter();

	// erreurs par champ
	const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>(
		{}
	);

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFieldErrors({}); // reset erreurs avant chaque soumission

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

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

				// redirect or other actions here
			} else if (res.status === 422) {
				if (data.errors && Array.isArray(data.errors)) {
					// construire un objet avec field => message
					const errorsObj: { [key: string]: string } = {};
					data.errors.forEach(
						(err: { field: string; message: string }) => {
							if (err.field) {
								errorsObj[err.field] = err.message;
							}
						}
					);
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
			<div className="xl:w-1/2 md:w-1/3 w-0 py-5 xl:pr-5 px-2 h-screen fixed ">
				<Image
					className="h-full w-full object-cover  rounded-r-2xl"
					src="/login_big_image.jpg"
					alt="Cloud with docs"
					width={900}
					height={2000}
				/>

				<h2 className="absolute bottom-3 w-full bg-gradient-to-r opacity-50 rounded-2xl text-center">
					Start your adventure on Guaranty
				</h2>
			</div>

			<div className="xl:w-1/2 md:w-2/3 w-full h-screen p-10 flex flex-col justify-center">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						width={500}
						height={500}
						alt="Your Company"
						src="/logo_black.png"
						className="mx-auto h-10 w-auto rounded-2xl"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Register
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
								htmlFor="fullName"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Full Name
							</label>
							<div className="mt-2">
								<input
									value={fullName}
									onChange={(e) =>
										setFullName(e.target.value)
									}
									id="fullName"
									name="fullName"
									type="text"
									required
									autoComplete="name"
									className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
										fieldErrors.name
											? "outline-red-600"
											: ""
									}`}
								/>
								{fieldErrors.name && (
									<p className="mt-1 text-sm text-red-600">
										{fieldErrors.name}
									</p>
								)}
							</div>
						</div>

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

						<div className="flex gap-3">
							<div className="flex h-6 shrink-0 items-center">
								<div className="group grid size-4 grid-cols-1">
									<input
										id="comments"
										name="comments"
										type="checkbox"
										aria-describedby="comments-description"
										className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
									/>
									<svg
										fill="none"
										viewBox="0 0 14 14"
										className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
									>
										<path
											d="M3 8L6 11L11 3.5"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="opacity-0 group-has-checked:opacity-100"
										/>
										<path
											d="M3 7H11"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="opacity-0 group-has-indeterminate:opacity-100"
										/>
									</svg>
								</div>
							</div>
							<div className="text-sm/6">
								<label
									htmlFor="comments"
									className="font-medium text-gray-900"
								>
									Accept{" "}
									<Link
										href="/terms"
										className="text-indigo-600 hover:text-indigo-500"
									>
										terms and conditions
									</Link>
								</label>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Register
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
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="font-semibold text-indigo-600 hover:text-indigo-500"
						>
							Sign in
						</Link>
					</p>

					<div className="mt-6">
						<GoogleButton
							onSuccess={(idToken) => {
								fetch(
									`${process.env.NEXT_PUBLIC_API_URL}/auth/login-with-google`,
									{
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({ idToken }),
									}
								)
									.then((res) => res.json())
									.then((data) => {
										console.log(data);
										if (data.token) {
											fetch("/api/login", {
												method: "POST",
												headers: {
													"Content-Type":
														"application/json",
												},
												body: JSON.stringify({
													token: data.token,
												}),
											}).then((res) => {
												console.log(
													"Login successful",
													res
												);
												router.replace("/dashboard"); // Redirect to dashboard after successful login
											});
										} else {
											setFieldErrors({
												general:
													data.message ||
													"Login failed",
											});
										}
									})
									.catch((error) => {
										setFieldErrors({
											general:
												error.message ||
												"Network error",
										});
									});
							}}
							onError={(error) => console.error(error)}
							text="Start with Google"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
