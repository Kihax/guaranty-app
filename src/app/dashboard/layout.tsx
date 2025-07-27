"use client";

import "../globals.css";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [fullName, setFullName] = useState<string | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const name =
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("fullName="))
				?.split("=")[1] ?? null;

		setFullName(decodeURIComponent(name ?? ""));
	}, []);

	// Fermer le menu utilisateur quand on clique en dehors
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		console.log("Déconnexion...");
		// Ajoute ici ta logique : suppression des cookies, redirection, etc.
	};

	return (
		<>
			<header className="bg-white shadow fixed top-0 w-full z-50">
				<nav
					aria-label="Global"
					className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				>
					{/* Logo */}
					<div className="flex lg:flex-1">
						<Link href="/" className="-m-1.5 p-1.5 flex items-center">
							<span className="sr-only">Your Company</span>
							<Image
								alt="Logo"
								src="/logo_black.png"
								className="h-8 w-auto"
								width={32}
								height={32}
							/>
						</Link>
					</div>

					{/* Menu hamburger mobile */}
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="size-6" />
						</button>
					</div>

					{/* Desktop - Profil utilisateur */}
					<div className="hidden lg:flex lg:flex-1 lg:justify-end" ref={dropdownRef}>
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md transition"
						>
							<Image
								src="/api/profile" // à remplacer par l'URL réelle du profil utilisateur
								alt="User"
								className="h-8 w-8 rounded-full object-cover"
								width={32}
								height={32}
							/>
							<span className="text-gray-700 font-medium">{fullName}</span>
							<ChevronDownIcon className="w-4 h-4 text-gray-500" />
						</button>

						{/* Dropdown */}
						{dropdownOpen && (
							<div className="absolute mt-12 right-6 w-44 bg-white shadow-lg border rounded-md z-50">
								<Link
									href="dashboard/settings"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Paramètres
								</Link>
								<Link
									href="/api/logout"
									className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Déconnexion
								</Link>
							</div>
						)}
					</div>
				</nav>

				{/* Mobile drawer menu */}
				<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<Link href="/" className="-m-1.5 p-1.5">
								<Image
									alt=""
									src="/logo_black.png"
									className="h-8 w-auto"
									width={32}
									height={32}
								/>
							</Link>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>
						<div className="mt-6">
							<div className="divide-y divide-gray-200">
								<div className="py-6">
									<span className="block text-gray-800 font-semibold">{fullName}</span>
									<Link href="/dashboard/settings" className="block mt-4 text-sm text-blue-600 hover:underline">
										Paramètres
									</Link>
									<Link
										href="/api/logout"
										className="block mt-2 text-sm text-red-600 hover:underline"
									>
										Déconnexion
									</Link>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>

			{/* Contenu principal, avec padding-top pour laisser place à la navbar */}
			<main className="pt-24">
				{children}
			</main>
		</>
	);
}