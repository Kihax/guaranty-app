"use client";

import "../globals.css";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
	Bars3Icon,
	XMarkIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
		console.log("Déconnexion...");
		// log out logic here
	};

	return (
		<>
			<header className="bg-white shadow fixed top-0 inset-x-0 z-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 justify-between items-center">
						{/* Logo */}
						<div className="flex items-center">
							<Link href="/" className="flex items-center">
								<Image
									src="/logo_black.png"
									alt="Logo"
									width={32}
									height={32}
									className="h-8 w-auto"
								/>
								<span className="ml-2 font-semibold text-lg text-gray-800">
									MonApp
								</span>
							</Link>
						</div>

						{/* Menu mobile */}
						<div className="flex lg:hidden">
							<button
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
								onClick={() => setMobileMenuOpen(true)}
							>
								<span className="sr-only">Ouvrir le menu</span>
								<Bars3Icon className="h-6 w-6" />
							</button>
						</div>

						{/* Profil utilisateur */}
						<div className="hidden lg:flex lg:items-center">
							<Menu as="div" className="relative ml-3">
								<Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<Image
										className="h-8 w-8 rounded-full object-cover"
										src="/api/profile-image"
										alt="Avatar utilisateur"
										width={32}
										height={32}
									/>
									<ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
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
									<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none">
										<Menu.Item>
											{({ active }) => (
												<Link
													href="/settings"
													className={`${
														active
															? "bg-gray-100"
															: ""
													} block px-4 py-2 text-sm text-gray-700`}
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
															? "bg-gray-100"
															: ""
													} block w-full text-left px-4 py-2 text-sm text-gray-700`}
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

				{/* Drawer mobile */}
				<Transition show={mobileMenuOpen} as={Fragment}>
					<Dialog
						as="div"
						className="lg:hidden"
						onClose={setMobileMenuOpen}
					>
						<Dialog.Panel className="fixed inset-0 z-50 bg-white p-6">
							<div className="flex items-center justify-between">
								<Link href="/" className="flex items-center">
									<Image
										src="/logo_black.png"
										alt="Logo"
										width={32}
										height={32}
										className="h-8 w-auto"
									/>
									<span className="ml-2 font-semibold text-lg text-gray-800">
										MonApp
									</span>
								</Link>
								<button
									type="button"
									className="text-gray-700"
									onClick={() => setMobileMenuOpen(false)}
								>
									<XMarkIcon className="h-6 w-6" />
								</button>
							</div>
							<div className="mt-6">
								<p className="text-gray-900 font-semibold">
									{fullName}
								</p>
								<Link
									href="/settings"
									className="block mt-4 text-sm text-blue-600 hover:underline"
								>
									Paramètres
								</Link>
								<button
									onClick={handleLogout}
									className="block mt-2 text-sm text-red-600 hover:underline"
								>
									Déconnexion
								</button>
							</div>
						</Dialog.Panel>
					</Dialog>
				</Transition>
			</header>

			{/* Espace pour la navbar fixe */}
			<main className="pt-20">{children}</main>
		</>
	);
}