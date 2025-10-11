import { http, HttpResponse } from 'msw';
import type { Verify2FaRequest } from '@/api/generated';
import { validateCSRF, createErrorResponse, createServerErrorResponse, createRateLimitResponse } from './auth-utils';

export const authVerify2FaHandlers = [
	// POST /auth/verify-2fa - 2FA verification scenarios
	http.post('http://localhost:3001/auth/verify-2fa', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { code } = (await request.json()) as Verify2FaRequest;

		// Test scenarios for 2FA verification
		if (code === 'invalid') {
			return createErrorResponse('Invalid 2FA code', 400);
		}

		if (code === 'expired') {
			return createErrorResponse('2FA code has expired', 400);
		}

		if (code === 'networkfail') {
			return new HttpResponse(null, { status: 400 });
		}

		if (code === 'networkerror') {
			return createServerErrorResponse();
		}

		if (code === 'ratelimited') {
			return createRateLimitResponse('2fa');
		}

		// Success scenarios
		if (code === '123456' || code === '000000') {
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

		// Default successful 2FA verification response
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
	}),
];
