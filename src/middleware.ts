import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

// Define which routes are only for certain roles
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

// Public auth routes (anyone can access if not logged in)
const authRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get current logged-in user info
  const userInfo = await getCurrentUser();

  // If user is not logged in
  if (!userInfo) {
    // Allow access to login or register page
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Otherwise, redirect to login page with redirect path
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  // If user is logged in and their role has restricted routes
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];

    // Check if the current path matches allowed routes for this role
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If logged in but trying to access a page not allowed for their role
  return NextResponse.redirect(new URL("/", request.url));
};

// Apply middleware to these routes
export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
