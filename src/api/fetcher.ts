import { getCsrfToken } from "./generated";

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const LOGIN_URL = "http://localhost:3000/login"
const BASE_SERVER_URL = "http://localhost:3001"

async function refreshToken(): Promise<void> {
    if ( isRefreshing ) {
        // Wait for the refresh to complete
        return new Promise((resolve) => {
            pendingRequests.push(resolve);
        });
    }

    isRefreshing = true;

    try {
        const csrfToken = (await getCsrfToken({ cache: 'no-cache' })).data?.csrfToken;
        const headers: HeadersInit = csrfToken ? { 'x-csrf-token': csrfToken } : {};

        const response = await fetch(`${BASE_SERVER_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include', // needed to send cookies
            headers
        });

        if ( !response.ok ) {
            throw new Error('Refresh failed');
        }

        // Resolve all pending requests
        pendingRequests.forEach((cb) => cb());
    } finally {
        pendingRequests = [];
        isRefreshing = false;
    }
}

export const customFetch: typeof fetch = async (input, init) => {
    let response = await fetch(input, {
        ...init,
        credentials: 'include',
    });

    if ( response.status === 401 ) {
        try {
            await refreshToken();

            // Retry the original request after refreshing
            response = await fetch(input, {
                ...init,
                credentials: 'include',
            });
        } catch (err) {
            window.location.replace(LOGIN_URL);
            console.error('Token refresh failed:', err);
        }
    }

  return response;
};
