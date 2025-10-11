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
	http.post('http://localhost:3001/auth/login', async ({ request }) => {
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
			return HttpResponse.json({
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				email: 'success@example.com',
				role: 'user',
				createdAt: '2023-01-01T12:00:00Z',
				enabled2FA: false,
				status: 'active',
			});
		}
		if (email === 'success2fa@example.com') {
			return HttpResponse.json({
				id: 2,
				firstName: 'Jane',
				lastName: 'Smith',
				email: 'success2fa@example.com',
				role: 'user',
				createdAt: '2023-01-01T12:00:00Z',
				enabled2FA: true,
				status: 'active',
			});
		}
		if (email === 'customreferrer@example.com') {
			return HttpResponse.json({
				id: 3,
				firstName: 'Custom',
				lastName: 'User',
				email: 'customreferrer@example.com',
				role: 'user',
				createdAt: '2023-01-01T12:00:00Z',
				enabled2FA: false,
				status: 'active',
			});
		}

		// Default successful login response
		return HttpResponse.json({
			id: 4,
			firstName: 'Default',
			lastName: 'User',
			email: email,
			role: 'user',
			createdAt: '2023-01-01T12:00:00Z',
			enabled2FA: false,
			status: 'active',
		});
	}),
];
