export default function DashboardPage() {
	return (
		<form className="lg:px-14 md:px-8 px-2">
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base/7 font-semibold text-gray-900">
						Paramètres du profil
					</h2>
					<p className="mt-1 text-sm/6 text-gray-600">
						Personnalisez votre expérience utilisateur.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="username"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Nom d&apos;utilisateur
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="username"
									id="username"
									autoComplete="username"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="user-photo"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Photo de profil
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
									className="size-12 text-gray-300"
								>
									<path
										fillRule="evenodd"
										d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653ZM6.145 17.812A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
										clipRule="evenodd"
									/>
								</svg>
								<button
									type="button"
									className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
								>
									Modifier
								</button>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="theme"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Thème
							</label>
							<div className="mt-2">
								<select
									id="theme"
									name="theme"
									className="block w-full rounded-md bg-white px-3 py-1.5 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								>
									<option value="light">Clair</option>
									<option value="dark">Sombre</option>
								</select>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="language"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Langue
							</label>
							<div className="mt-2">
								<select
									id="language"
									name="language"
									className="block w-full rounded-md bg-white px-3 py-1.5 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								>
									<option value="fr">Français</option>
									<option value="en">Anglais</option>
									<option value="es">Espagnol</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label className="block text-sm/6 font-medium text-gray-900">
								Supprimer le compte
							</label>
							<p className="mt-2 text-sm/6 text-gray-600">
								Cette action est irréversible.
							</p>
							<div className="mt-4">
								<button
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
					type="button"
					className="text-sm/6 font-semibold text-gray-900"
				>
					Annuler
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Enregistrer
				</button>
			</div>
		</form>
	);
}
