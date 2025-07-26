import { useState } from "react";
import Image from "next/image";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Appelle ton backend ici
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		})
			.then((response) => {
				if (response.ok) {
					setSubmitted(true);
				} else {
					throw new Error("Failed to send reset link");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Image
					width={500}
					height={500}
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
					Forgot your password?
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					No worries, we’ll send you a reset link.
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
					{submitted ? (
						<p className="text-green-600 text-center">
							If an account exists, a reset link has been sent to
							your email.
						</p>
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Send reset link
								</button>
							</div>
						</form>
					)}

					<div className="mt-6 text-center">
						<a
							href="/login"
							className="text-sm text-indigo-600 hover:text-indigo-500"
						>
							Back to login
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
