import { http, HttpResponse } from 'msw';
import type { User } from '@/api/generated';

export const authSessionHandlers = [
	// GET /auth/session - Comprehensive scenarios
	http.get('/auth/session', async ({ request }) => {
		const cookies = request.headers.get('cookie');

		if (!cookies?.includes('connect.sid') || !cookies?.includes('access_token')) {
			return new HttpResponse(null, { status: 401 });
		}

		// Return user session data
		const user: User = {
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			role: 'user',
			createdAt: new Date('2023-01-01'),
			enabled2FA: false,
			status: 'active',
		};

		return HttpResponse.json(user);
	}),
];
