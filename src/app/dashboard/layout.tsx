"use client";

import "../globals.css";

import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [fullName, setFullName] = useState("Utilisateur");

	useEffect(() => {
		const name =
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("fullName="))
				?.split("=")[1] ?? "Utilisateur";
		setFullName(decodeURIComponent(name));
	}, []);

	const handleLogout = () => {
		window.location.href = "/api/logout";
	};

	return (
		<>
			<header className="bg-white dark:bg-gray-900 shadow fixed top-0 inset-x-0 z-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 justify-between items-center">
						{/* Logo */}
						<div className="flex items-center">
							<Link
								href="/dashboard"
								className="flex items-center"
							>
								{/* Logo clair */}
								<Image
									src="/logo_black.png"
									alt="Logo"
									width={32}
									height={32}
									className="h-8 w-auto rounded-xl block dark:hidden"
								/>
								{/* Logo sombre */}
								<Image
									src="/logo.png"
									alt="Logo"
									width={32}
									height={32}
									className="h-8 w-auto rounded-xl hidden dark:block"
								/>
								<span className="ml-2 font-semibold text-lg text-gray-800 dark:text-gray-100">
									Guaranty
								</span>
							</Link>
						</div>

						{/* Profil utilisateur */}
						<div className="flex items-center">
							<Menu as="div" className="relative ml-3">
								<Menu.Button className="flex items-center text-sm rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none ring-2 ring-gray-50 dark:ring-gray-800 focus:ring-indigo-500 focus:ring-offset-2">
									<Image
										className="h-8 w-8 rounded-xl object-cover"
										src="/api/profile-image"
										alt="Avatar utilisateur"
										width={32}
										height={32}
										unoptimized
									/>
									<span className="ml-2 text-gray-800 dark:text-gray-100">
										{fullName}
									</span>
									<ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
								</Menu.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 py-1 shadow-lg focus:outline-none">
										<Menu.Item>
											{({ active }) => (
												<Link
													href="/dashboard/settings"
													className={`${
														active
															? "bg-gray-100 dark:bg-gray-800"
															: ""
													} block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
												>
													Paramètres
												</Link>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													onClick={handleLogout}
													className={`${
														active
															? "bg-gray-100 dark:bg-gray-800"
															: ""
													} block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
												>
													Déconnexion
												</button>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</header>

			{/* Espace pour la navbar fixe */}
			<main className="pt-20 bg-gray-50 dark:bg-gray-950 min-h-screen">
				{children}
			</main>
		</>
	);
}
