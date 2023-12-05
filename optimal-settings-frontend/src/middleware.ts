import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("token")) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin",
};
