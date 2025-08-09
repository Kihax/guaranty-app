"use client";

import React, { useEffect, useState } from "react";
import SelectTheme from "@/components/SelectTheme";
import Image from "next/image";
import DeleteAccountDialog from "@/components/DeleteAccountDialog";

export default function DashboardPage() {
	const [fullName, setFullName] = useState("");
	const [imagePreview, setImagePreview] = useState<string | null>(
		`/api/profile-image`
	);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDeleteAccount = async (password: string) => {
		try {
			await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/profile/delete`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${
							document.cookie
								.split("; ")
								.find((row) => row.startsWith("token="))
								?.split("=")[1] || ""
						}`,
					},
					body: JSON.stringify({ password }),
				}
			)
				.then((res) => res.json())
				.then((data) => {
					if (!data.valid) {
						throw new Error("Failed to delete account");
					}

					//logout
					fetch("/api/logout").then(() => {
						window.location.href = "/"; // Redirect to home after deletion
					});
				});
		} catch (error) {
			console.error("Error deleting account:", error);
			alert("Erreur lors de la suppression du compte.");
		}
	};

	useEffect(() => {
		setFullName(
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("fullName="))
				?.split("=")[1] || ""
		);
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreview(null);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("fullName", decodeURI(fullName));
		const fileInput = e.currentTarget.querySelector(
			'input[type="file"]'
		) as HTMLInputElement;
		if (fileInput.files && fileInput.files[0]) {
			formData.append("profileImage", fileInput.files[0]);
		}
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile/update`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${
					document.cookie
						.split("; ")
						.find((row) => row.startsWith("token="))
						?.split("=")[1] || ""
				}`,
			},
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Profile updated successfully:", data);
				fetch("/api/update-cookie")
					.then((res) => res.json())
					.then(() => {
						window.location.reload(); // Reload to reflect changes
					});
			})
			.catch((error) => {
				console.error("Error updating profile:", error);
			});
	};

	return (
		<form className="lg:px-14 md:px-8 px-2" onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
					<h2 className="text-base/7 font-semibold text-gray-900 dark:text-gray-100">
						Paramètres du profil
					</h2>
					<p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
						Personnalisez votre expérience utilisateur.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="fullName"
								className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
							>
								Nom d&apos;utilisateur
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="fullName"
									id="fullName"
									value={fullName}
									onChange={(e) =>
										setFullName(e.target.value)
									}
									autoComplete="fullName"
									className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="user-photo"
								className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
							>
								Photo de profil
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								{imagePreview ? (
									<Image
										width={64}
										height={64}
										src={imagePreview}
										unoptimized
										alt="Aperçu du ticket"
										className="h-16 rounded-md border border-gray-300 dark:border-gray-700"
									/>
								) : (
									<span className="h-16 w-16 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 border border-dashed border-gray-300 dark:border-gray-700">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.5"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
									</span>
								)}
								<input
									type="file"
									id="receiptImage"
									name="receipt"
									accept="image/*"
									onChange={handleFileChange}
									className="block text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-gray-800 file:text-indigo-700 dark:file:text-gray-100 hover:file:bg-indigo-100 dark:hover:file:bg-gray-700"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="theme"
								className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
							>
								Thème
							</label>
							<div className="mt-2">
								<SelectTheme />
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="language"
								className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
							>
								Langue
							</label>
							<div className="mt-2">
								<select
									id="language"
									name="language"
									className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 pr-8 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								>
									<option value="fr">Français</option>
									<option value="en">Anglais</option>
									<option value="es">Espagnol</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
								Supprimer le compte
							</label>
							<p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
								Cette action est irréversible.
							</p>
							<div className="mt-4">
								<button
									onClick={() => setDeleteDialogOpen(true)}
									type="button"
									className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
								>
									Supprimer mon compte
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Enregistrer
				</button>
			</div>

			<DeleteAccountDialog
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
				onDelete={handleDeleteAccount}
			/>
		</form>
	);
}
