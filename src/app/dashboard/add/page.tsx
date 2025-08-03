export default function DashboardPage() {
	return (
		<form>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base/7 font-semibold text-gray-900">
						Garantie produit
					</h2>
					<p className="mt-1 text-sm/6 text-gray-600">
						Renseignez les informations liées à l&apos;achat et à la
						garantie de votre produit.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="object-name"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Nom de l&apos;objet
							</label>
							<div className="mt-2">
								<input
									id="object-name"
									name="object-name"
									type="text"
									required
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="brand"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Marque (optionnel)
							</label>
							<div className="mt-2">
								<input
									id="brand"
									name="brand"
									type="text"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="purchase-date"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Date d&apos;achat
							</label>
							<div className="mt-2">
								<input
									id="purchase-date"
									name="purchase-date"
									type="date"
									required
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="warranty-duration"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Durée de la garantie (mois)
							</label>
							<div className="mt-2">
								<input
									id="warranty-duration"
									name="warranty-duration"
									type="number"
									min="0"
									required
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="serial-number"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Numéro de série (optionnel)
							</label>
							<div className="mt-2">
								<input
									id="serial-number"
									name="serial-number"
									type="text"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="warranty-type"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Type de garantie (optionnel)
							</label>
							<div className="mt-2">
								<select
									id="warranty-type"
									name="warranty-type"
									className="block w-full rounded-md bg-white px-3 py-1.5 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								>
									<option value="">—</option>
									<option value="constructeur">
										Constructeur
									</option>
									<option value="magasin">Magasin</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="note"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Note (optionnel)
							</label>
							<div className="mt-2">
								<textarea
									id="note"
									name="note"
									rows={3}
									maxLength={500}
									placeholder="Ajouter une remarque..."
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								></textarea>
							</div>
							<p className="mt-2 text-sm/6 text-gray-600">
								500 caractères maximum.
							</p>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="customer-support"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Contact service consommateur (optionnel)
							</label>
							<div className="mt-2">
								<input
									id="customer-support"
									name="customer-support"
									type="text"
									placeholder="Email, téléphone, etc."
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
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
		</form>
	);
}
