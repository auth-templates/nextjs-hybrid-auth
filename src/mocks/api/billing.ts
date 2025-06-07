import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/billing/setup-intent-client-secret', async ({ request }) => {
        return HttpResponse.json({
            setupIntentClientSecret: 'seti_1MCUvZJi62xrXjNAx5mzw9zR_secret_MwNgOmj3FmnItpzKlHB7sRz3VrOoOKc',
        });
    })
]

export default handlers;