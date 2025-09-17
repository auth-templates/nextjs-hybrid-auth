import { http, HttpResponse } from 'msw';
import type { Verify2FaCodeRequest } from '@/api/generated';
import { validateCSRF, createErrorResponse } from './auth-utils';

export const authVerify2FaHandlers = [
	// POST /auth/verify-2fa - Comprehensive scenarios
	http.post('/auth/verify-2fa', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { code } = (await request.json()) as Verify2FaCodeRequest;

		// Comprehensive test scenarios
		if (code === '000000') return createErrorResponse('Invalid 2FA code', 400);

		// Default successful 2FA verification
		return HttpResponse.json({ referrer: '/dashboard' });
	}),
];
