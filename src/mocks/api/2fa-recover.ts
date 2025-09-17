import { http, HttpResponse } from 'msw';
import { csrfToken } from './csrf';
import type { Recover2FaRequest } from '@/api/generated';

export const twoFaRecoverHandlers = [
	// POST /2fa/recover
	http.post('/2fa/recover', async ({ request }) => {
		const { email } = (await request.json()) as Recover2FaRequest;

		if (request.headers.get('x-csrf-token') !== csrfToken) {
			return new HttpResponse(null, { status: 400 });
		}

		// Always return success for security
		return HttpResponse.json({
			message: 'If an account with that email exists and has 2FA enabled, a recovery link has been sent.',
		});
	}),
];
