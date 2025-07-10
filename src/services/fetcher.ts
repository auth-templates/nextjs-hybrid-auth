import { Dictionary } from "@/dictionary";
import { RequestError } from "@/utils/request-error";

export async function fetchWithNoCache(...args: Parameters<typeof fetch>) {
    let [url, options] = args;
    options = {
        ...options,
        cache: 'no-store',
    }
    return fetch(url, options);
}

export async function fetcher(...args: Parameters<typeof fetch>) {
    try {
        const response = await fetchWithNoCache(...args);
        if( !response.ok ) {
            let errorMessage = Dictionary.failedToFetchData;
            try {
                errorMessage = (await response.json()).result;
            } catch (error) {
                console.log(error);
            }
            throw new RequestError(errorMessage);
        }
    } catch (error) {
        throw error;
    }
}

export async function fetchWithRedirect(...args: Parameters<typeof fetch>) {
    const response = await fetchWithNoCache(...args);
    if ( [302, 303, 307].includes(response.status) ) {
        const location = response.headers.get('Location');

        if ( location ) {
            // If the redirect URL is relative, construct the full URL
            const redirectUrl = new URL(location, response.url).href;
            // Handle 303 separately to ensure we use GET method for the redirected request
            if ( response.status === 303 ) {
                return fetchWithRedirect(redirectUrl, {
                    ...args[1],
                    method: 'GET',
                    body: undefined //Ensure body is not sent with GET request
                })
            }

            return fetchWithRedirect(redirectUrl, args[1]);
        }
    }

    if ( response.redirected ) {
        window.location.href = response.url;
        // wait to prevent error being displayed before the page is changed
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    return response;
}

