import { http, HttpResponse } from 'msw';
import type { ResetPasswordRequest, ConfirmResetPasswordRequest } from '@/api/generated';
import {
	validateCSRF,
	createErrorResponse,
	createAccountLockedResponse,
	createServerErrorResponse,
	createServiceUnavailableResponse,
	createRateLimitResponse,
} from './auth-utils';

export const authResetPasswordHandlers = [
	// POST /auth/reset-password/request - Comprehensive scenarios
	http.post('/auth/reset-password/request', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { userEmail } = (await request.json()) as ResetPasswordRequest;

		// Comprehensive test scenarios
		if (userEmail === 'invalid-email') return createErrorResponse('Please enter a valid email address', 400);
		if (userEmail === 'toomany@example.com') return createRateLimitResponse('password reset');
		if (userEmail === 'locked@example.com') return createAccountLockedResponse();
		if (userEmail === 'servererror@example.com') return createServerErrorResponse();
		if (userEmail === 'serviceunavailable@example.com') return createServiceUnavailableResponse('Email');
		if (userEmail === 'unverified@example.com')
			return createErrorResponse('Please verify your email address before requesting a password reset.', 403);

		// Default: Generic security response
		return HttpResponse.json({
			message: 'If an account with that email exists, a password reset link has been sent.',
		});
	}),

	// POST /auth/reset-password - Comprehensive scenarios
	http.post('/auth/reset-password', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const body = (await request.json()) as ConfirmResetPasswordRequest;

		// Comprehensive test scenarios
		if (body.token === 'invalid-format') return createErrorResponse('Invalid reset token format', 400);
		if (body.token === 'expired-token')
			return createErrorResponse('Password reset token has expired. Please request a new one.', 410);
		if (body.token === 'already-used-token')
			return createErrorResponse('This password reset token has already been used', 409);
		if (body.token === 'not-found-token') return createErrorResponse('Password reset token not found', 404);
		if (body.token === 'server-error-token') return createServerErrorResponse();
		if (body.token === 'rate-limited-token') return createRateLimitResponse('password reset');
		if (body.token === 'locked-token') return createAccountLockedResponse();

		if (body.newPassword === 'weak') {
			return HttpResponse.json(
				{
					messages: [
						{ text: 'Password must be at least 8 characters long', severity: 'error' },
						{ text: 'Password must contain at least one uppercase letter', severity: 'error' },
						{ text: 'Password must contain at least one number', severity: 'error' },
						{ text: 'Password must contain at least one special character', severity: 'error' },
					],
				},
				{ status: 400 }
			);
		}

		if (body.newPassword === 'same-password') {
			return createErrorResponse('New password must be different from your current password', 400);
		}

		if (body.token === 'valid-token' || body.token === 'success-token') {
			return HttpResponse.json({ message: 'Password reset successfully' });
		}

		// Default: Generic invalid token
		return createErrorResponse('Invalid or expired reset token', 400);
	}),

	// POST /auth/request-password-reset - Legacy password reset request
	http.post('/auth/request-password-reset', async ({ request }) => {
		const { email } = (await request.json()) as any;

		if (email === 'inexistentaccount@mail.com') {
			return HttpResponse.json(
				{
					message: 'Email is invalid',
				},
				{
					status: 404,
				}
			);
		}

		return HttpResponse.json({
			message: 'If an account with that email exists, a password reset link has been sent.',
		});
	}),
];
