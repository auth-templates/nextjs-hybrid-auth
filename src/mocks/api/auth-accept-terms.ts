import { http, HttpResponse } from 'msw';
import { validateCSRF } from './auth-utils';

export const authAcceptTermsHandlers = [
	// POST /auth/accept-terms - Comprehensive scenarios
	http.post('/auth/accept-terms', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		return HttpResponse.json({ message: 'Terms accepted successfully' });
	}),
];
