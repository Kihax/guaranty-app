import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
	const cookieStore = await cookies();

	const token = cookieStore.get("token")?.value;

	try {

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

		return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL));
	} catch (error: unknown) {
		const message =
			error instanceof Error
				? error.message
				: "An unknown error occurred";
		return NextResponse.json({ message }, { status: 500 });
	}
}
