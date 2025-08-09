import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
	{ name: "fonctionnalités", href: "#features" },
	{ name: "Prix", href: "#pricing" },
	{ name: "FAQ", href: "#faq" },
];

export default function HomePage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const features = [
		{
			icon: (
				<svg
					className="w-8 h-8 text-indigo-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<rect
						x="3"
						y="5"
						width="18"
						height="14"
						rx="3"
						fill="#EEF2FF"
						stroke="#6366F1"
						strokeWidth="1.5"
					/>
					<path
						d="M7 9h10M7 13h6"
						stroke="#6366F1"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<circle cx="17" cy="13" r="1" fill="#6366F1" />
				</svg>
			),
			title: "Factures sécurisées",
			desc: "Stockez toutes vos factures dans un espace chiffré et sécurisé.",
		},
		{
			icon: (
				<svg
					className="w-8 h-8 text-indigo-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<path
						d="M12 3v18M21 12H3"
						stroke="#6366F1"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<circle
						cx="12"
						cy="12"
						r="9"
						stroke="#6366F1"
						strokeWidth="1.5"
						fill="#EEF2FF"
					/>
				</svg>
			),
			title: "Toujours accessible",
			desc: "Retrouvez vos justificatifs partout, sur mobile ou web.",
		},
		{
			icon: (
				<svg
					className="w-8 h-8 text-indigo-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<path
						d="M8 12l2.5 2.5L16 9"
						stroke="#6366F1"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<rect
						x="4"
						y="4"
						width="16"
						height="16"
						rx="4"
						fill="#EEF2FF"
						stroke="#6366F1"
						strokeWidth="1.5"
					/>
				</svg>
			),
			title: "Remboursements facilités",
			desc: "Présentez vos factures en un clic pour vos garanties et remboursements.",
		},
		{
			icon: (
				<svg
					className="w-8 h-8 text-indigo-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<path
						d="M12 17v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1"
						stroke="#6366F1"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<circle
						cx="12"
						cy="8"
						r="4"
						fill="#EEF2FF"
						stroke="#6366F1"
						strokeWidth="1.5"
					/>
				</svg>
			),
			title: "Sérénité assurée",
			desc: "Protégez votre argent et vos droits de consommateur.",
		},
	];

	const faqs = [
		{
			q: "Guaranty est-il gratuit ?",
			a: "Oui, l'utilisation de la web app est gratuite. Certaines fonctionnalités avancées peuvent être payantes sur mobile.",
		},
		{
			q: "Comment mes données sont-elles protégées ?",
			a: "Vos factures sont chiffrées et stockées de façon sécurisée. Seul vous y avez accès.",
		},
		{
			q: "Puis-je utiliser Guaranty sans installer l'application ?",
			a: "Oui, la web app est accessible depuis n'importe quel navigateur.",
		},
		{
			q: "Comment récupérer mes factures si je change de téléphone ?",
			a: "Il suffit de vous reconnecter à votre compte sur n'importe quel appareil.",
		},
	];

	return (
		<div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
			{/* Header */}
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					aria-label="Global"
					className="flex items-center justify-between p-6 lg:px-8"
				>
					<div className="flex lg:flex-1">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Guaranty</span>
							<Image
                width={40}
                height={40}
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
					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-sm/6 font-semibold text-gray-900"
							>
								{item.name}
							</a>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<a
							href="#"
							className="text-sm/6 font-semibold text-gray-900"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</a>
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
								<span className="sr-only">Guaranty</span>
								<Image
									alt=""
									src="/logo_black.png"
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
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</a>
									))}
								</div>
								<div className="py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
									>
										Log in
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>

			{/* Hero Section */}
			<section className="relative isolate pt-24 sm:pt-32 lg:pt-40 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
					<div className="max-w-3xl">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
							Gardez vos factures en sécurité.
							<br />
							<span className="text-indigo-600 dark:text-indigo-400">
								Ne perdez plus jamais vos remboursements !
							</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
							Guaranty centralise et protège vos factures pour que
							vous puissiez les retrouver et les présenter à tout
							moment, sur mobile ou web.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="https://play.google.com/store/apps/details?id=com.guaranty.app"
								className="flex items-center justify-center w-48 mt-3 text-white bg-black rounded-lg h-14"
							>
								<div className="mr-3">
									<svg
										viewBox="30 336.7 120.9 129.2"
										width="30"
									>
										<path
											fill="#FFD400"
											d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
										></path>
										<path
											fill="#FF3333"
											d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
										></path>
										<path
											fill="#48FF48"
											d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
										></path>
										<path
											fill="#3BCCFF"
											d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
										></path>
									</svg>
								</div>
								<div>
									<div className="text-xs">GET IT ON</div>
									<div className="-mt-1 font-sans text-xl font-semibold">
										Google Play
									</div>
								</div>
							</a>
							<a
								href="/auth/login"
								className="flex items-center justify-center w-48 mt-3 text-white bg-indigo-700 rounded-lg h-14 ml-0 sm:ml-2"
							>
								<div className="mr-3">
									<svg
										width="30"
										height="30"
										viewBox="0 0 30 30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect
											width="30"
											height="30"
											rx="6"
											fill="#fff"
										/>
										<path
											d="M9 15.5C9 13.0147 11.0147 11 13.5 11H16.5C18.9853 11 21 13.0147 21 15.5V19C21 19.5523 20.5523 20 20 20H10C9.44772 20 9 19.5523 9 19V15.5Z"
											fill="#6366F1"
										/>
										<circle
											cx="15"
											cy="13"
											r="2"
											fill="#6366F1"
										/>
									</svg>
								</div>
								<div>
									<div className="text-xs">ACCÉDER À</div>
									<div className="-mt-1 font-sans text-xl font-semibold">
										la Web App
									</div>
								</div>
							</a>
						</div>
					</div>
					<div className="mt-16 flex justify-center">
						<Image
							src="/dashboard.png"
							alt="Illustration factures"
							width={520}
							height={400}
							className="rounded-3xl shadow-2xl object-cover max-h-[340px] w-auto"
						/>
					</div>
				</div>
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-200 via-white to-blue-200 opacity-30 dark:from-indigo-900 dark:via-gray-900 dark:to-blue-900"
						style={{
							clipPath:
								"polygon(74.8% 44.1%, 100% 61.6%, 97.2% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.8% 44.1%)",
						}}
					/>
				</div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="py-24 sm:py-32 bg-white dark:bg-gray-900"
			>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="sm:text-center">
						<h2 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">
							Fonctionnalités
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							Tout ce dont vous avez besoin pour vos factures
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
							Guaranty simplifie la gestion, la sécurité et la
							présentation de vos justificatifs.
						</p>
					</div>
					<div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
						{features.map((f, i) => (
							<div
								key={i}
								className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-indigo-50 dark:bg-gray-800 shadow hover:scale-105 transition-transform"
							>
								{f.icon}
								<h3 className="font-semibold text-lg text-indigo-800 dark:text-indigo-200">
									{f.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 text-base">
									{f.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section
				id="pricing"
				className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900"
			>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="sm:text-center">
						<h2 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">
							Tarifs
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							Des offres simples et transparentes
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
							La web app est gratuite, l&apos;application mobile
							propose des options avancées pour les utilisateurs
							exigeants.
						</p>
					</div>
					<div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
						{/* Gratuit */}
						<div className="flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 p-8">
							<h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
								Web App
							</h3>
							<p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
								Gratuit
							</p>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								Accès illimité à toutes les fonctionnalités de
								base depuis votre navigateur.
							</p>
							<ul className="flex-1 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
								<li>✔️ Stockage sécurisé</li>
								<li>✔️ Accès multi-appareils</li>
								<li>✔️ Export PDF</li>
								<li>✔️ Support email</li>
							</ul>
							<a
								href="/auth/login"
								className="mt-auto w-full inline-block text-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition"
							>
								Commencer
							</a>
						</div>
						{/* Mobile Essentiel */}
						<div className="flex flex-col rounded-3xl bg-indigo-50 dark:bg-indigo-900 shadow-2xl ring-2 ring-indigo-600 dark:ring-indigo-400 p-8 scale-105 z-10">
							<h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-200 mb-2">
								Mobile Essentiel
							</h3>
							<p className="text-4xl font-bold text-indigo-700 dark:text-indigo-200 mb-2">
								2,99€
								<span className="text-base font-normal text-gray-600 dark:text-gray-300">
									/mois
								</span>
							</p>
							<p className="text-gray-700 dark:text-gray-200 mb-6">
								Toutes les fonctionnalités de la web app + accès
								mobile natif et notifications.
							</p>
							<ul className="flex-1 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
								<li>✔️ Application Android</li>
								<li>✔️ Notifications</li>
								<li>✔️ Scan de factures</li>
								<li>✔️ Support prioritaire</li>
							</ul>
							<a
								href="https://play.google.com/store/apps/details?id=com.guaranty.app"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto w-full inline-block text-center rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-2 transition"
							>
								Télécharger
							</a>
							<div className="bg-indigo-600 dark:bg-indigo-400 text-white dark:text-indigo-900 text-xs font-bold text-center py-2 tracking-wide mt-6 rounded-lg">
								Le plus populaire
							</div>
						</div>
						{/* Mobile Premium */}
						<div className="flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 p-8">
							<h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
								Mobile Premium
							</h3>
							<p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
								5,99€
								<span className="text-base font-normal text-gray-600 dark:text-gray-300">
									/mois
								</span>
							</p>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								Pour les utilisateurs intensifs : stockage
								augmenté, assistance VIP, fonctionnalités
								exclusives.
							</p>
							<ul className="flex-1 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
								<li>✔️ Tout Mobile Essentiel</li>
								<li>✔️ Stockage illimité</li>
								<li>✔️ Assistance VIP</li>
								<li>✔️ Fonctionnalités à venir</li>
							</ul>
							<a
								href="https://play.google.com/store/apps/details?id=com.guaranty.app"
								target="_blank"
								rel="noopener noreferrer"
								className="mt-auto w-full inline-block text-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition"
							>
								Choisir Premium
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section
				id="faq"
				className="py-24 sm:py-32 bg-white dark:bg-gray-900"
			>
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="sm:text-center">
						<h2 className="text-lg font-semibold leading-8 text-indigo-600 dark:text-indigo-400">
							FAQ
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
							Questions fréquentes
						</p>
					</div>
					<div className="mt-16 max-w-3xl mx-auto flex flex-col gap-8">
						{faqs.map((faq, i) => (
							<div
								key={i}
								className="rounded-2xl bg-indigo-50 dark:bg-gray-800 shadow p-6"
							>
								<h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-200 mb-2">
									{faq.q}
								</h3>
								<p className="text-gray-700 dark:text-gray-300 text-base">
									{faq.a}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="w-full py-8 text-center text-gray-400 text-sm bg-white dark:bg-gray-900 mt-auto border-t border-gray-100 dark:border-gray-800">
				&copy; {new Date().getFullYear()} Guaranty. Tous droits
				réservés.
			</footer>
		</div>
	);
}
