import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname; // gives "/profile" the endpoint clearly

  const isPublicPath = path === "/login" || path === "/signup";

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url)); // gives the full url
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login", "/signup"],
};
