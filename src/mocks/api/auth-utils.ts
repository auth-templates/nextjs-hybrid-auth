import { HttpResponse } from 'msw';
import { csrfToken } from './csrf';

// Helper functions to reduce redundancy across auth handlers
export const validateCSRF = (request: Request): HttpResponse<null> | null => {
	if (request.headers.get('x-csrf-token') !== csrfToken) {
		return new HttpResponse(null, { status: 400 });
	}
	return null;
};

export const createErrorResponse = (message: string, status: number) =>
	HttpResponse.json({ messages: [{ text: message, severity: 'error' }] }, { status });

export const createInfoResponse = (message: string, status: number = 200) =>
	HttpResponse.json({ messages: [{ text: message, severity: 'info' }] }, { status });

export const createServerErrorResponse = () => new HttpResponse(null, { status: 500 });

export const createRateLimitResponse = (action: string) =>
	createErrorResponse(`Too many ${action} attempts. Please try again later.`, 429);

export const createAccountLockedResponse = () =>
	createErrorResponse('This account has been locked. Please contact support.', 423);

export const createInvalidEmailResponse = () => createErrorResponse('Please enter a valid email address', 400);

export const createServiceUnavailableResponse = (service: string) =>
	createErrorResponse(`${service} service is temporarily unavailable. Please try again later.`, 503);
