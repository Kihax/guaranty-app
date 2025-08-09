"use client";

import React, { useEffect } from "react";
import Item from "@/components/Item";
import AddButtonDashboard from "@/components/AddButtonDashboard";
import EmptyDashboard from "@/components/EmptyDashboard";

export default function DashboardPage() {
	
	const [data, setData] = React.useState<
		Array<{ id: number; productName: string; warrantyExpiryDate: string }>
	>([]);

	useEffect(() => {
		const storedItems = localStorage.getItem("items");
		if (storedItems) {
			setData(JSON.parse(storedItems));
		}

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
				localStorage.setItem("items", JSON.stringify(result));
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		}
		fetchData();
	}, []);

	if(data.length === 0) {
		return (
			<div className="px-5">
				<AddButtonDashboard />
				<EmptyDashboard />
			</div>
		);
	}

	return (
		<div className="px-5">
			<AddButtonDashboard />

			<h1 className="text-2xl font-bold">Items</h1>
			<ul role="list" className="divide-y divide-gray-100 px-5 mb-16">
				{data.map((item) => (
					<Item key={item.id} item={item} setData={setData} />
				))}
			</ul>
		</div>
	);
}
