import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {

    const cookieStore = await cookies();

  const token = (await cookies()).get("token");

  console.log("Token in logout:", token);

  try {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('User response:', userResponse);

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user')
    }

    const user = await userResponse.json()

    try {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error during logout:', error);
    }
    const cookieStore = await cookies();
    console.log('Cookie store before deletion:', cookieStore.getAll());
    cookieStore.delete('guaranty_session');


    return NextResponse.json({ message: 'Logout successful' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 })
  }
}
