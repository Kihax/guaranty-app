"use client";

import "../globals.css";

import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [fullName, setFullName] = useState<string | null>(null);

	useEffect(() => {
		const name =
			document.cookie
				.split("; ")
				.find((row) => row.startsWith("fullName="))
				?.split("=")[1] ?? null;

		setFullName(name);
	}, []);

	return (
		<>
			<header className="bg-white">
				<nav
					aria-label="Global"
					className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				>
					<div className="flex lg:flex-1">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<Image
								alt=""
								src="/logo_black.png"
								className="h-8 w-auto"
							/>
						</a>
					</div>
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

					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<Image
							alt=""
							src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
							className="h-8 w-auto"
						/>

						{fullName}
					</div>
				</nav>
				<Dialog
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
					className="lg:hidden"
				>
					<div className="fixed inset-0 z-50" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<a href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Your Company</span>
								<Image
									alt=""
									src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
									className="h-8 w-auto"
								/>
							</a>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									aria-hidden="true"
									className="size-6"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
									>
										{fullName}
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
			{children}
		</>
	);
}
