import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  let body;

  try {
    // Try to parse JSON body, but catch if empty or invalid
    body = await request.json();
  } catch {
    // If no body or invalid JSON, respond with error
    return NextResponse.json({ message: "Request body missing or invalid JSON" }, { status: 400 });
  }
  const { token } = body || {};

  if (!token) {
    return NextResponse.json({ message: 'Token is missing' }, { status: 400 })
  }

  try {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user')
    }

    const user = await userResponse.json()

    const cookieStore = await cookies();
    cookieStore.set('token', token);
    cookieStore.set('id', user.id);
    cookieStore.set('email', user.email);
    cookieStore.set('fullName', user.fullName);
    cookieStore.set('emailVerified', user.emailVerified);


    return NextResponse.json({ message: 'Login successful' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 })
  }
}
