import { http, HttpResponse } from 'msw';

export const csrfToken = 'abc123csrfTOKEN456xyz';

// Helper functions for consistency with auth.ts
const createErrorResponse = (message: string, status: number) =>
	HttpResponse.json({ messages: [{ text: message, severity: 'error' }] }, { status });

const createServerErrorResponse = () => new HttpResponse(null, { status: 500 });

const createRateLimitResponse = (action: string) =>
	createErrorResponse(`Too many ${action} requests. Please wait before trying again.`, 429);

const createServiceUnavailableResponse = (service: string) =>
	createErrorResponse(`${service} service is temporarily unavailable. Please try again later.`, 503);

export const csrfHandlers = [
	// GET /csrf/token - Comprehensive scenarios
	http.get('/csrf/token', async ({ request }) => {
		const userAgent = request.headers.get('user-agent');

		// Comprehensive test scenarios
		if (userAgent?.includes('rate-limited')) return createRateLimitResponse('CSRF token');
		if (userAgent?.includes('server-error')) return createServerErrorResponse();
		if (userAgent?.includes('service-unavailable')) return createServiceUnavailableResponse('CSRF');

		// Default: Successful token generation
		return HttpResponse.json(
			{ csrfToken },
			{
				status: 200,
				headers: {
					'Set-Cookie': `XSRF-TOKEN=${csrfToken}; HttpOnly; Secure; SameSite=Strict`,
				},
			}
		);
	}),
];
