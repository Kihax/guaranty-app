"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { getDifference } from "@/app/lib/date";

export default function DashboardPage() {
	const [data, setData] = React.useState<
		Array<{ id: number; productName: string; warrantyExpiryDate: string }>
	>([]);

	const handleDelete = (id: number) => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/delete/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${
					document.cookie
						.split("; ")
						.find((row) => row.startsWith("token=")
						)?.split("=")[1] || ""
				}`,
			},	
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				setData((prevData) => prevData.filter((item) => item.id !== id));
			})
			.catch((error) => {
				console.error("Error deleting item:", error);
			});
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/items/get`,
					{
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
					}
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		}
		fetchData();
	}, []);

	return (
		<div className="px-5">
			<div className="fixed bottom-0 z-10 bg-white border-t border-gray-200 py-4 px-6 flex justify-end">
				<button
					type="button"
					onClick={() => (window.location.href = "/dashboard/add")}
					className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-5 w-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					Ajouter
				</button>
			</div>

			<h1 className="text-2xl font-bold">Items</h1>
			<ul role="list" className="divide-y divide-gray-100 px-5">
				{data.map((item) => (
					<li
						className="flex justify-between gap-x-6 p-3 bg-gray-50 rounded-lg"
						key={item.id}
					>
						<div className="flex min-w-0 gap-x-4">
							<Image
								width={48}
								height={48}
								alt=""
								src={`/api/image?id=${item.id}`}
								className="size-12 flex-none rounded-2xl bg-gray-50"
							/>
							<div className="min-w-0 flex-auto">
								<p className="text-sm/6 font-semibold text-gray-900">
									{item.productName}
								</p>
								<p className="mt-1 truncate text-xs/5 text-gray-500">
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
											"bg-gray-100 text-gray-800 ring-gray-300";
										if (diff.isPast) {
											badgeClass =
												"bg-red-200 text-red-800 ring-red-400";
										} else if (diff.totalMonths < 2) {
											badgeClass =
												"bg-red-100 text-red-700 ring-red-300";
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
								className="inline-flex items-center rounded-md bg-white px-2 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
								Éditer
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
								Supprimer
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
