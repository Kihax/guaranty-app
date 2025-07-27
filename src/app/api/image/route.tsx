import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		if (!id) {
			return NextResponse.json(
				{ message: "Item ID is required" },
				{ status: 400 }
			);
		}

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/items/image/${id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch items");
		}

		const contentType =
			response.headers.get("content-type") || "image/jpeg";
		const buffer = await response.arrayBuffer();

		return new Response(buffer, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred";
		return NextResponse.json({ message }, { status: 500 });
	}
}
