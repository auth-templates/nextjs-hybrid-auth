import { http, HttpResponse } from 'msw';
import type { VerifyTokenRequest } from '@/api/generated';
import {
	validateCSRF,
	createErrorResponse,
	createInfoResponse,
	createServerErrorResponse,
	createRateLimitResponse,
} from './auth-utils';

export const authVerifySignupHandlers = [
	// POST /auth/verify-signup - Comprehensive scenarios
	http.post('http://localhost:3001/auth/verify-signup', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { token } = (await request.json()) as VerifyTokenRequest;

		// Comprehensive test scenarios
		if (token === 'invalid-format') return createErrorResponse('Invalid verification token format', 400);
		if (token === 'expired-token')
			return createErrorResponse('Verification token has expired. Please request a new one.', 410);
		if (token === 'already-used-token')
			return createErrorResponse('This verification token has already been used', 409);
		if (token === 'not-found-token') return createErrorResponse('Verification token not found', 404);
		if (token === 'already-verified-token') return createInfoResponse('Account is already verified', 200);
		if (token === 'server-error-token') return createServerErrorResponse();
		if (token === 'rate-limited-token') return createRateLimitResponse('verification');

		if (token === 'valid-token' || token === 'success-token') {
			return HttpResponse.json({ message: 'Account verified successfully' });
		}

		// Default: Generic invalid token
		return createErrorResponse('Invalid or expired verification token', 400);
	}),
];
