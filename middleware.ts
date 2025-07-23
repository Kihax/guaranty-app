import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🔥 Middleware is running!");
  return NextResponse.next();
}