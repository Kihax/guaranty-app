/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function EditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const { id } = useParams();
	const [productName, setProductName] = useState("");
	const [brand, setBrand] = useState("");
	const [purchaseDate, setPurchaseDate] = useState("");
	const [warrantyDurationMonths, setWarrantyDurationMonths] = useState("");
	const [receiptImage, setReceiptImage] = useState<File | null>(null);
	const [serialNumber, setSerialNumber] = useState("");
	const [purchaseLocation, setPurchaseLocation] = useState("");
	const [warrantyType, setWarrantyType] = useState("");
	const [notes, setNotes] = useState("");
	const [customerServiceContact, setCustomerServiceContact] = useState("");

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/get/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${
					document.cookie
						.split("; ")
						.find((row) => row.startsWith("token="))
						?.split("=")[1] || ""
				}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Item data:", data);
				setImagePreview(`/api/image?id=${id}`);
				setProductName(data.productName);
				setBrand(data.brand || "");
				setPurchaseDate(data.purchaseDate);
				setWarrantyDurationMonths(data.warrantyDurationMonths);
				setReceiptImage(null);
				setSerialNumber(data.serialNumber || "");
				setPurchaseLocation(data.purchaseLocation || "");
				setWarrantyType(data.warrantyType || "");
				setNotes(data.notes || "");
				setCustomerServiceContact(data.customerServiceContact || "");
			})
			.catch((error) => {
				console.error("Failed to fetch item data:", error);
			});
	}, [id]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/update/${id}`, {
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
				window.location.href = "/dashboard";
			})
			.catch((error) => {
				console.error("Error submitting form data:", error);
			});
	};

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

	return (
		<form className="lg:px-14 md:px-8 px-2" onSubmit={handleSubmit}>
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
								htmlFor="product-name"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Nom de l&apos;objet
							</label>
							<div className="mt-2">
								<input
									name="product_name"
									id="product-name"
									type="text"
									required
									value={productName}
									onChange={(e) =>
										setProductName(e.target.value)
									}
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
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
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
									name="purchase_date"
									type="date"
									required
									value={purchaseDate}
									onChange={(e) =>
										setPurchaseDate(e.target.value)
									}
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
									name="warranty_duration_months"
									type="number"
									min="1"
									required
									value={warrantyDurationMonths}
									onChange={(e) =>
										setWarrantyDurationMonths(
											e.target.value
										)
									}
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="receiptImage"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Image du ticket
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								{imagePreview ? (
									<Image
										width={64}
										height={64}
										src={imagePreview}
										alt="Aperçu du ticket"
										className="h-16 rounded-md border border-gray-300"
									/>
								) : (
									<span className="h-16 w-16 flex items-center justify-center rounded-md bg-gray-100 text-gray-400 border border-dashed border-gray-300">
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
									className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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
									name="serial_number"
									type="text"
									value={serialNumber}
									onChange={(e) =>
										setSerialNumber(e.target.value)
									}
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="serial-number"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Lieu d&apos;achat
							</label>
							<div className="mt-2">
								<input
									id="purchase-location"
									name="purchase_location"
									type="text"
									value={purchaseLocation}
									onChange={(e) =>
										setPurchaseLocation(e.target.value)
									}
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
									name="warranty_type"
									value={warrantyType}
									onChange={(e) =>
										setWarrantyType(e.target.value)
									}
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
								htmlFor="notes"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Note (optionnel)
							</label>
							<div className="mt-2">
								<textarea
									id="notes"
									name="notes"
									rows={3}
									maxLength={500}
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
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
									name="customer_service_contact"
									type="text"
									value={customerServiceContact}
									onChange={(e) =>
										setCustomerServiceContact(
											e.target.value
										)
									}
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
					type="button"
					onClick={() => (window.location.href = "/dashboard")}
					className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
