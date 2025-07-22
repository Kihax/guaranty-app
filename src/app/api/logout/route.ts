import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request, response: Response) {
	const cookieStore = await cookies();

	const token = cookieStore.get("token")?.value;

	try {
		const userResponse = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log("User response:", userResponse);

		if (!userResponse.ok) {
			throw new Error("Failed to fetch user");
		}

		const user = await userResponse.json();

		try {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			console.error("Error during logout:", error);
		}
		cookieStore.delete("token");
		cookieStore.delete("id");
		cookieStore.delete("email");
		cookieStore.delete("fullName");
		cookieStore.delete("emailVerified");

		response.writeHead(302, { Location: "/login" });
		response.end();
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred";
		return NextResponse.json({ message }, { status: 500 });
	}
}
