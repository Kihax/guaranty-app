import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
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

        const cookieStore = await cookies();
        cookieStore.set('id', user.id);
        cookieStore.set('email', user.email);
        cookieStore.set('fullName', user.fullName);
        cookieStore.set('emailVerified', user.emailVerified);

    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "An unknown error occurred";
        return NextResponse.json({ message }, { status: 500 });
    }

}