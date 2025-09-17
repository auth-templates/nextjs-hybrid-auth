import { http, HttpResponse } from 'msw';
import type { SignupRequest } from '@/api/generated';
import { validateCSRF, createErrorResponse, createServerErrorResponse, createRateLimitResponse } from './auth-utils';

export const authSignupHandlers = [
	// POST /auth/signup - Comprehensive scenarios
	http.post('/auth/signup', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const body = (await request.json()) as SignupRequest;

		// Comprehensive test scenarios
		if (body.email === 'existing@example.com')
			return createErrorResponse('An account with this email already exists', 409);
		if (body.email === 'invalid-email') return createErrorResponse('Please enter a valid email address', 400);
		if (body.email === 'servererror@example.com') return createServerErrorResponse();
		if (body.email === 'ratelimited@example.com') return createRateLimitResponse('signup');
		if (body.email?.includes('@blocked.com')) return createErrorResponse('This email domain is not allowed', 403);

		if (body.password === 'weak') {
			return HttpResponse.json(
				{
					messages: [
						{ text: 'Password must be at least 8 characters long', severity: 'error' },
						{ text: 'Password must contain at least one uppercase letter', severity: 'error' },
						{ text: 'Password must contain at least one number', severity: 'error' },
					],
				},
				{ status: 400 }
			);
		}

		if (!body.termsAccepted) return createErrorResponse('You must accept the terms and conditions', 400);
		if (!body.firstName || !body.lastName) return createErrorResponse('First name and last name are required', 400);

		// Default successful signup
		return HttpResponse.json({
			message: 'Account created successfully. Please check your email for verification.',
		});
	}),
];
