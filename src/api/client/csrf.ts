import { fetchWithNoCache } from "@/services/fetcher";

export async function getCsrfToken() {
    const response = await fetchWithNoCache(`${process.env.NEXT_PUBLIC_BASE_PATH}csrf-token`);
    const { csrfToken } = await response.json();
    return csrfToken;
}