import Image from "next/image";
import { getDifference } from "@/app/lib/date";
import React from "react";

interface ItemProps {
	item: {
		id: string | number;
		productName: string;
		warrantyExpiryDate: string;
		// Add other properties as needed
	};

	setData: React.Dispatch<
		React.SetStateAction<
			Array<{
				id: number;
				productName: string;
				warrantyExpiryDate: string;
			}>
		>
	>;
}

export default function Item({ item, setData }: ItemProps) {
	const handleDelete = (id: number | string) => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/delete/${id}`, {
			method: "DELETE",
			headers: {
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
				setData((prevData) =>
					prevData.filter((item) => item.id !== id)
				);
			})
			.catch((error) => {
				console.error("Error deleting item:", error);
			});
	};

	return (
		<li
			className="flex justify-between gap-x-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
			key={item.id}
		>
			<div className="flex min-w-0 gap-x-4">
				<Image
					width={48}
					height={48}
					alt=""
					src={`/api/image?id=${item.id}`}
					unoptimized
					className="size-12 flex-none rounded-2xl bg-gray-50 dark:bg-gray-700"
				/>
				<div className="min-w-0 flex-auto">
					<p className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100">
						{item.productName}
					</p>
					<p className="mt-1 truncate text-xs/5 text-gray-500 dark:text-gray-400">
						{(() => {
							const diff = getDifference(
								new Date(item.warrantyExpiryDate)
							);

							let text = "";
							if (diff.years >= 2) {
								text = `${diff.years} an${
									diff.years > 1 ? "s" : ""
								}`;
							} else if (diff.totalMonths >= 1) {
								text = `${diff.totalMonths} mois`;
							} else {
								text = `${diff.totalDays} jours`;
							}

							let badgeClass =
								"bg-gray-100 text-gray-800 ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600";
							if (diff.isPast) {
								badgeClass =
									"bg-red-200 text-red-800 ring-red-400 dark:bg-red-900 dark:text-red-200 dark:ring-red-700";
							} else if (diff.totalMonths < 2) {
								badgeClass =
									"bg-red-100 text-red-700 ring-red-300 dark:bg-red-800 dark:text-red-200 dark:ring-red-600";
							}

							return (
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeClass}`}
								>
									{text}
								</span>
							);
						})()}
					</p>
				</div>
			</div>
			<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"></div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() =>
						(window.location.href = `/dashboard/edit/${item.id}`)
					}
					className="inline-flex items-center rounded-md bg-white dark:bg-gray-900 px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-4 w-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.862 4.487a2.121 2.121 0 1 1 3 3L7.5 19.5H4.5v-3L16.862 4.487z"
						/>
					</svg>
					<span className="hidden md:block">Éditer</span>
				</button>
				<button
					type="button"
					onClick={() => handleDelete(item.id)}
					className="inline-flex items-center rounded-md bg-red-600 px-2 py-1.5 text-sm font-medium text-white hover:bg-red-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-4 w-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<span className="hidden md:block">Supprimer</span>
				</button>
			</div>
		</li>
	);
}
