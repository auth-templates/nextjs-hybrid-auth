import { fetchWithRedirect } from "@/services/fetcher";
import { RequestError } from "@/utils/request-error";

export async function login(data: {email:string, password:string}, csrfToken: string): Promise<void> {
    try {
        // const response = await fetchWithRedirect(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/login`, {
        //     method: 'POST',
        //     cache: 'no-cache', 
        //     headers: {
        //         'X-CSRF-Token': csrfToken,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        // if( !response.ok ) {
        //     throw new RequestError((await response.json()).message);           
        // }
        throw new Error("message");
    } catch(error:any) {
        if (error instanceof RequestError) throw error.message;
        else throw new Error('An unexpected error occurred. Please try again later.');
    };
}

export async function register(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/register`, {
            method: 'POST',
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if( !response.ok ) {
            throw new RequestError((await response.json()).message);           
        }
    } catch(error:any) {
        if (error instanceof RequestError) throw error.message;
        else throw 'An unexpected error occurred. Please try again later.';
    };
}

export async function recoverPassword(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/recover-password`, {
            method: 'POST',
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if( !response.ok ) {
            throw new RequestError((await response.json()).message);           
        }
    } catch(error:any) {
        if (error instanceof RequestError) throw error.message;
        else throw 'An unexpected error occurred. Please try again later.';
    };
}


export async function resendConfirmationEmail(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/resend-confirmation-email`, {
            method: 'POST',
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if( !response.ok ) {
            throw new RequestError((await response.json()).message);           
        }
    } catch(error:any) {
        if (error instanceof RequestError) throw error.message;
        else throw 'An unexpected error occurred. Please try again later.';
    };
}

export async function resetPassword(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/reset-password`, {
            method: 'POST',
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if( !response.ok ) {
            throw new RequestError((await response.json()).message);           
        }
    } catch(error:any) {
        if (error instanceof RequestError) throw error.message;
        else throw 'An unexpected error occurred. Please try again later.';
    };
}

export async function verifyAccount(data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/verify-account`, {
            method: 'POST',
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if( !response.ok ) {
            throw new RequestError((await response.json()).message);           
        }
    } catch(error:any) {
        if (error instanceof RequestError) throw error.message;
        else throw 'An unexpected error occurred. Please try again later.';
    };
}