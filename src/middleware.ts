import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { PublicRoutes } from './routes';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

// Define public routes that don't require authentication
const publicRoutes = [
	PublicRoutes.login,
	PublicRoutes.register,
	PublicRoutes.requestPasswordReset,
	PublicRoutes.requestActivationEmail,
	'/reset-password', // Handle dynamic token routes
	'/verify-account', // Handle dynamic token routes
	PublicRoutes.twoStep,
	'/', // Home page
];

// Helper function to normalize pathname for comparison
function normalizePathname(pathname: string): string {
	// Remove locale prefix (e.g., /en, /ro) if present
	const localePattern = /^\/[a-z]{2}(\/|$)/;
	return pathname.replace(localePattern, '/');
}

// Helper function to check if a path is public
function isPublicRoute(pathname: string): boolean {
	const normalizedPath = normalizePathname(pathname);

	return publicRoutes.some((route) => {
		// Handle dynamic routes with tokens
		if (route.includes(':')) {
			const routePattern = route.replace(/:\w+/g, '[^/]+');
			const regex = new RegExp(`^${routePattern}$`);
			return regex.test(normalizedPath);
		}
		return normalizedPath === route || normalizedPath.startsWith(route + '/');
	});
}

// Helper function to verify JWT signature using jose (Edge Runtime compatible)
async function verifyJWT(token: string, secret: string): Promise<boolean> {
	try {
		const secretKey = new TextEncoder().encode(secret);
		await jwtVerify(token, secretKey);
		return true;
	} catch (error) {
		console.warn('JWT verification failed:', error);
		return false;
	}
}

// Helper function to validate session via backend
async function validateSession(request: NextRequest): Promise<boolean> {
	try {
		const sessionId = request.cookies.get('connect.sid')?.value;
		const refreshToken = request.cookies.get('refresh_token')?.value;

		if (!sessionId || !refreshToken) {
			return false;
		}

		// Make request to backend to validate session
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate-session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `connect.sid=${sessionId}; refresh_token=${refreshToken}`,
			},
			// Don't follow redirects
			redirect: 'manual',
		});

		return response.status === 200;
	} catch (error) {
		console.warn('Session validation failed:', error);
		return false;
	}
}

// Helper function to check if user is authenticated
async function isAuthenticated(request: NextRequest): Promise<boolean> {
	const cookies = request.cookies;

	// Fast fail: Check for required authentication cookies
	const hasSessionCookie = cookies.has('connect.sid');
	const hasRefreshToken = cookies.has('refresh_token');

	// Session ID and refresh token must always be present
	if (!hasSessionCookie || !hasRefreshToken) {
		return false;
	}

	// Check for access token (optional)
	const accessToken = cookies.get('access_token')?.value;

	if (accessToken) {
		try {
			// Verify access token signature using Web Crypto API
			const isValid = await verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET!);
			if (isValid) {
				return true;
			}
		} catch (error) {
			console.warn('Access token verification failed:', error);
		}

		// Access token is invalid/expired, check session
		console.warn('Access token invalid, checking session');

		// Validate session via backend
		return await validateSession(request);
	}

	// No access token, check session
	return await validateSession(request);
}

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// First, handle internationalization
	const intlResponse = intlMiddleware(request);

	// Skip auth check for API routes, static files, and other non-page routes
	if (
		pathname.startsWith('/api/') ||
		pathname.startsWith('/_next/') ||
		pathname.startsWith('/_vercel/') ||
		pathname.includes('.') ||
		pathname.startsWith('/favicon')
	) {
		return intlResponse;
	}

	// Check if the route is public
	if (isPublicRoute(pathname)) {
		return intlResponse;
	}

	// Check authentication for private routes
	if (!(await isAuthenticated(request))) {
		// Create redirect URL with the current pathname as a query parameter
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('redirect', pathname);

		return NextResponse.redirect(loginUrl);
	}

	return intlResponse;
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
