"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { getDateDifference, getDifference } from "@/app/lib/date";

export default function DashboardPage() {
	const [data, setData] = React.useState<
		Array<{ id: number; productName: string; warrantyExpiryDate: string }>
	>([]);
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
					</li>
				))}
			</ul>
		</div>
	);
}
