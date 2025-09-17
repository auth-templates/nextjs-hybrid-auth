import { http, HttpResponse } from 'msw';
import { csrfToken } from './csrf';
import type { Verify2FaCodeRequest } from '@/api/generated';

export const twoFaVerifySetupHandlers = [
	// POST /2fa/verify-setup
	http.post('/2fa/verify-setup', async ({ request }) => {
		const { code } = (await request.json()) as Verify2FaCodeRequest;

		if (request.headers.get('x-csrf-token') !== csrfToken) {
			return new HttpResponse(null, { status: 400 });
		}

		// Check for session cookie and access token
		const cookies = request.headers.get('cookie');

		if (!cookies?.includes('connect.sid') || !cookies?.includes('access_token')) {
			return new HttpResponse(null, { status: 401 });
		}

		// Test case for invalid 2FA setup code
		if (code === '000000') {
			return HttpResponse.json(
				{
					messages: [{ text: 'Invalid 2FA setup code', severity: 'error' }],
				},
				{ status: 400 }
			);
		}

		// Successful 2FA setup verification
		return HttpResponse.json({
			message: '2FA setup completed successfully',
		});
	}),
];
