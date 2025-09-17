import { http, HttpResponse } from 'msw';

export const authRefreshHandlers = [
	// POST /auth/refresh - Comprehensive scenarios
	http.post('/auth/refresh', async ({ request }) => {
		const cookies = request.headers.get('cookie');

		if (!cookies?.includes('connect.sid') || !cookies?.includes('refresh_token')) {
			return new HttpResponse(null, { status: 401 });
		}

		return HttpResponse.json({
			accessToken: 'new-access-token-' + Date.now(),
		});
	}),
];
