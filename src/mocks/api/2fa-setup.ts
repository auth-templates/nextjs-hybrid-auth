import { http, HttpResponse } from 'msw';
import { csrfToken } from './csrf';
import type { TwoFaSetupResponse } from '@/api/generated';

export const twoFaSetupHandlers = [
	// POST /2fa/setup
	http.post('/2fa/setup', async ({ request }) => {
		if (request.headers.get('x-csrf-token') !== csrfToken) {
			return new HttpResponse(null, { status: 400 });
		}

		// Check for session cookie and access token
		const cookies = request.headers.get('cookie');

		if (!cookies?.includes('connect.sid') || !cookies?.includes('access_token')) {
			return new HttpResponse(null, { status: 401 });
		}

		// Return 2FA setup data
		const setupResponse: TwoFaSetupResponse = {
			qrCodeUrl:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
			secret: 'JBSWY3DPEHPK3PXP',
		};

		return HttpResponse.json(setupResponse);
	}),
];
