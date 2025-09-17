import { http, HttpResponse } from 'msw';
import {
	validateCSRF,
	createInfoResponse,
	createErrorResponse,
	createServerErrorResponse,
	createRateLimitResponse,
} from './auth-utils';

export const authLogoutHandlers = [
	// POST /auth/logout - Comprehensive scenarios
	http.post('/auth/logout', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const cookies = request.headers.get('cookie');

		// Comprehensive test scenarios
		if (!cookies?.includes('connect.sid')) return createInfoResponse('No active session found', 200);
		if (cookies?.includes('invalid-session')) return createErrorResponse('Invalid session', 401);
		if (cookies?.includes('expired-session')) return createErrorResponse('Session has expired', 401);
		if (cookies?.includes('server-error-session')) return createServerErrorResponse();
		if (cookies?.includes('rate-limited-session')) return createRateLimitResponse('logout');

		// Default successful logout
		return HttpResponse.json({ message: 'Logged out successfully' });
	}),
];
