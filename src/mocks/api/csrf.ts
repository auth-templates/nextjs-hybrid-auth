import { http, HttpResponse } from 'msw';

export const csrfToken = 'abc123csrfTOKEN456xyz';

export const handlers = [
	http.get('/csrf-token', async ({ request }) => {
		return HttpResponse.json(
			{
				csrfToken,
			},
			{
				status: 200,
				headers: {
					'Set-Cookie': `XSRF-TOKEN=${csrfToken};`,
				},
			}
		);
	}),
];
