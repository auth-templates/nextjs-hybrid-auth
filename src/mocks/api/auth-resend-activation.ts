import { http } from 'msw';
import type { ResendActivationEmailRequest } from '@/api/generated';
import {
	validateCSRF,
	createErrorResponse,
	createInfoResponse,
	createAccountLockedResponse,
	createServerErrorResponse,
	createServiceUnavailableResponse,
} from './auth-utils';

export const authResendActivationHandlers = [
	// POST /auth/resend-activation-email - Comprehensive scenarios
	http.post('http://localhost:3001/auth/resend-activation-email', async ({ request }) => {
		const csrfError = validateCSRF(request);
		if (csrfError) return csrfError;

		const { userEmail } = (await request.json()) as ResendActivationEmailRequest;

		// Comprehensive test scenarios
		if (userEmail === 'invalid-email') return createErrorResponse('Please enter a valid email address', 400);
		if (userEmail === 'inexistentaccount@mail.com')
			return createErrorResponse('No account with the email inexistentaccount@mail.com has been found', 404);
		if (userEmail === 'accountnotactive@mail.com')
			return createErrorResponse(
				'An account with the email accountnotactive@mail.com exists, but it is not active.',
				400
			);
		if (userEmail === 'customservermessage@mail.com')
			return createErrorResponse('Custom server error message', 500);
		if (userEmail === 'notfound@example.com')
			return createErrorResponse('No account found with this email address', 404);
		if (userEmail === 'alreadyverified@example.com')
			return createInfoResponse('This account is already verified', 200);
		if (userEmail === 'toomany@example.com')
			return createErrorResponse('Too many activation email requests. Please wait before trying again.', 429);
		if (userEmail === 'locked@example.com') return createAccountLockedResponse();
		if (userEmail === 'servererror@example.com') return createServerErrorResponse();
		if (userEmail === 'serviceunavailable@example.com') return createServiceUnavailableResponse('Email');

		// Default: Generic security response
		return createInfoResponse('If your email still needs to be verified, a confirmation link has been sent.');
	}),
];
