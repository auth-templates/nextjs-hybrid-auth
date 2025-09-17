import { http, HttpResponse } from 'msw';
import { csrfToken } from './csrf';

export const twoFaDisableHandlers = [
	// DELETE /2fa/disable
	http.delete('/2fa/disable', async ({ request }) => {
		if (request.headers.get('x-csrf-token') !== csrfToken) {
			return new HttpResponse(null, { status: 400 });
		}

		// Check for session cookie and access token
		const cookies = request.headers.get('cookie');

		if (!cookies?.includes('connect.sid') || !cookies?.includes('access_token')) {
			return new HttpResponse(null, { status: 401 });
		}

		// Successful 2FA disable
		return HttpResponse.json({
			message: '2FA disabled successfully',
		});
	}),
];
