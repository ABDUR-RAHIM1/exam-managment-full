// middleware.js
import { NextResponse } from 'next/server';

// Token validation function
const validateToken = (request, role) => {
    const tokenName = role === 'admin' ? 'adminToken' : 'userToken';
    const token = request.cookies.get(tokenName);
    // console.log("middlewere caling" , role)
    return !!token; // Returns true if token exists
};

// Middleware function
export function middleware(request) {
    const url = request.nextUrl.pathname;

    // Check for admin routes
    if (url.startsWith('/dashboard')) {
        if (!validateToken(request, 'admin')) {
            return NextResponse.redirect(new URL('/admin-auth', request.url));
        }
    }
    // Check for user routes
    else if (url.startsWith('/profile') || url.startsWith('/profile')) {
        if (!validateToken(request, 'user')) {
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    }

    // If all checks pass
    return NextResponse.next();
}


export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/profile/:path*'],
};
