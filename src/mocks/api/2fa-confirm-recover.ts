import { http, HttpResponse } from 'msw';
import { csrfToken } from './csrf';
import type { ConfirmRecover2FaRequest } from '@/api/generated';

export const twoFaConfirmRecoverHandlers = [
	// POST /2fa/confirm-recover
	http.post('/2fa/confirm-recover', async ({ request }) => {
		const { token } = (await request.json()) as ConfirmRecover2FaRequest;

		if (request.headers.get('x-csrf-token') !== csrfToken) {
			return new HttpResponse(null, { status: 400 });
		}

		// Test case for invalid recovery token
		if (token === 'invalid-token') {
			return HttpResponse.json(
				{
					messages: [{ text: 'Invalid or expired recovery token', severity: 'error' }],
				},
				{ status: 400 }
			);
		}

		// Successful 2FA recovery
		return HttpResponse.json({
			message: '2FA recovery completed successfully',
		});
	}),
];
