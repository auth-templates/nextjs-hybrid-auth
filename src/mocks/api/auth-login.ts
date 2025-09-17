import { http, HttpResponse } from 'msw';
import type { LoginRequest } from '@/api/generated';
import {
	validateCSRF,
	createErrorResponse,
	createAccountLockedResponse,
	createServerErrorResponse,
	createRateLimitResponse,
} from './auth-utils';

export const authLoginHandlers = [
	// POST /auth/login - Comprehensive scenarios
	http.post('/auth/login', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { email, password } = (await request.json()) as LoginRequest;

		// Legacy test cases for backward compatibility
		if (email === 'message') {
			return HttpResponse.json({ message: 'Email is invalid' }, { status: 404 });
		}

		if (email === 'invalidpassword@mail.com') {
			return HttpResponse.json(
				{
					messages: [
						{ text: 'Some dummy text 1', severity: 'error' },
						{ text: 'Some dummy text 2', severity: 'info' },
					],
				},
				{ status: 400 }
			);
		}

		if (email === 'networkfail@mail.com') {
			return new HttpResponse(null, { status: 400 });
		}

		// Comprehensive test scenarios
		if (email === 'invalid-email') return createErrorResponse('Please enter a valid email address', 400);
		if (email === 'notfound@example.com')
			return createErrorResponse('No account found with this email address', 404);
		if (email === 'wrongpassword@example.com') return createErrorResponse('Incorrect password', 401);
		if (email === 'unverified@example.com')
			return createErrorResponse('Please verify your email address before logging in', 403);
		if (email === 'locked@example.com') return createAccountLockedResponse();
		if (email === 'networkerror@example.com') return createServerErrorResponse();
		if (email === 'ratelimited@example.com') return createRateLimitResponse('login');

		// Success scenarios
		if (email === 'success@example.com') {
			return HttpResponse.json({ has2FA: false, referrer: '/dashboard' });
		}
		if (email === 'success2fa@example.com') {
			return HttpResponse.json({ has2FA: true, referrer: '/verify-2fa' });
		}
		if (email === 'customreferrer@example.com') {
			return HttpResponse.json({ has2FA: false, referrer: '/custom-page' });
		}

		// Default successful login response
		return HttpResponse.json({ has2FA: false, referrer: '/dashboard' });
	}),
];
