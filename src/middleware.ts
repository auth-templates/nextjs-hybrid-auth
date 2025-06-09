import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// const csrfProtect = createCsrfProtect({
//     cookie: {
//         secure: process.env.NODE_ENV === 'production'
//     }
// })



//https://www.npmjs.com/package/csrf-csrf

const apiRoutesBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH as string;
export async function middleware(request: NextRequest) {
    const response = NextResponse.next();


    // console.log("request", request);
    // console.log("request", request.headers);

    // if ( request.nextUrl.pathname === `/csrf-token` ) {
    //     return NextResponse.json({csrfToken: response.headers.get('X-CSRF-Token') || 'missing'})
    // }

    // if ( ['POST', 'PUT', 'DELETE'].includes(request.method) && request.nextUrl.pathname.startsWith(apiRoutesBasePath) ) {
    //     try {
    //         // await csrfProtect(request, response);
    //     } catch (error) {
    //         if ( error instanceof CsrfError ) return new HttpResponse('invalid csrf token', { status: 403 });
    //         throw error;
    //     }
    // }

    if ( !request.nextUrl.pathname.startsWith('/api/') ) {
        const headers = new Headers(request.headers);
        const search = request.nextUrl.search;
        const pathname = request.nextUrl.pathname;
        headers.set("x-redirect-url", `${pathname}${search}`);
        return NextResponse.next({ headers });
    }

    return response;
}

export const config = {
    runtime: 'nodejs', // Enables Node.js runtime
    matcher: "/((?!api|static|.*\\..*|_next).*)",
}