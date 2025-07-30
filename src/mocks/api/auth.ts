import { http, HttpResponse } from 'msw';
import { csrfToken } from './csrf';

export const handlers = [
    http.post('/auth/login', async ({ request }) => {
        const { email, password } = await request.json() as any;
        console.log(email, password, request.headers.get('x-csrf-token'))
      
        if ( request.headers.get('x-csrf-token') !== csrfToken) {
            return new HttpResponse(
                null,
                { status: 400 }
            );
        }

        if( email === 'message') {
            return HttpResponse.json(
                {
                    message: 'Email is invalid',
                },
                { status: 404 }
            )
        }

        if( email === 'invalidpassword@mail.com') {
            return HttpResponse.json(
            {
                messages: [{text: "Some dummy text 1", severity: 'error'}, {text: "Some dummy text 2", severity: 'info'}],
            },
            { status: 400 }
            )
        }

        if ( email === 'networkfail@mail.com' ) {
            return new HttpResponse(
                null,
                { status: 400 }
            );
        } 

        return HttpResponse.json(
            {
                has2FA: false,
                referrer: '/dashboard'
            }
        );  
    }),
    
    http.get('/auth/captcha', async ({ request }) => {
        return HttpResponse.text('data:image/jpeg;base64,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');
    }),

    http.post('/auth/register', async ({ request }) => {
        const { 
            firstname, lastname, email, password, confirmPassword,
            captcha, toc, csrfToken 
        } = await request.json() as any;
        if( email === 'alreadyexistsaccount@mail.com') {
            return HttpResponse.json({
                message: 'Email is already registered',
            }, 
            { status: 404 }
            );
        }

        if ( email === 'customservermessage@mail.com' ) {
            return HttpResponse.json({
                message: 'Custom message',
            }, 
            { status: 400 }
            );
        }

        if( email === 'invalidpassword@mail.com') {
            return HttpResponse.json({
                message: 'Password is invalid',
            }, 
            { status: 400 }
            );
        }

        if ( email === 'networkfail@mail.com' ) {
            return new HttpResponse(null, { status: 500 });
        } 

        
        if ( email === 'badcsrftoken@mail.com' && csrfToken === '4gdf23ff' ) {
            return new HttpResponse(null, { status: 400 });
        } 

        if ( !csrfToken ) {
            return new HttpResponse(null, { status: 400 });
        }

        return new HttpResponse(null, { status: 204 });
    }),
    http.post('/auth/request-password-reset',  async ({ request }) => {
        const { email, csrfToken} = await request.json() as any;
      
        if( email === 'inexistentaccount@mail.com') {
            return HttpResponse.json({
                message: 'Email is invalid',
            }, { 
                status: 404,
            });
        }

        if( email === 'accountnotactive@mail.com') {
            return HttpResponse.json({
                message: 'Email is not verified',
            }, { 
                status: 400,
            });
        }
      
        if ( email === 'customservermessage@mail.com' ) {
            return HttpResponse.json({
                message: 'Custom message',
            }, { 
                status: 400,
            });
        }

        if ( email === 'badcsrftoken@mail.com' && csrfToken === '4gdf23ff' ) {
            return new HttpResponse(null, { 
                status: 400,
            });
        } 

        if ( !csrfToken ) {
            return new HttpResponse(null, { 
                status: 400,
            });
        }

        return new HttpResponse(null, { 
            status: 204,
        });
    }),
    
    http.post('/auth/reset-password', async ({ request }) => {
        const { password, confirmPassword, captcha, token, csrfToken } = await request.json() as any;

        if( captcha === 'wrong-captcha' ) {
            return HttpResponse.json({
                message: 'Wrong captcha',
            }, { 
                status: 500,
            });
        }

        if ( token === "1000" ) {
            return HttpResponse.json({
                message: 'Reset token is not valid',
            }, { 
                status: 400,
            });
        }

        if ( !csrfToken ) {
            return HttpResponse.json({
                message: 'Reset token is not valid',
            }, { 
                status: 400,
            });
        }

        return new HttpResponse(null, { 
            status: 204,
        });
    }),

    http.post('/auth/resend-confirmation-email', async ({ request }) => {
        const { email, csrfToken } = await request.json() as any;
      
        if( email === 'inexistentaccount@mail.com') {
            return HttpResponse.json({
                message: 'Email is invalid',
            }, {
                status: 404
            });
        }

        if( email === 'accountnotactive@mail.com') {
            return HttpResponse.json({
                message: 'Email is not verified',
            }, {
                status: 400
            });
        }
        
        if ( email === 'customservermessage@mail.com' ) {
            return HttpResponse.json({
                message: 'Custom message',
            }, {
                status: 400
            });
        }

        if ( email === 'badcsrftoken@mail.com' && csrfToken === '4gdf23ff' ) {
            return new HttpResponse(null, {
                status: 400
            });
        } 

        if ( !csrfToken ) {
            return new HttpResponse(null, {
                status: 400
            });
        }

        return new HttpResponse(null, {
            status: 204
        });
    }),

    http.post('/auth/verify-account', async ({ request }) => {
        const { token, csrfToken } = await request.json() as any;
            
        if ( token === "2000" ) {
            return HttpResponse.json({
                message: 'Custom message',
            }, {
                status: 500
            });
        }

        if ( token === "1000" ) {
            return HttpResponse.json({
                message: 'Confirmation token is not valid',
            }, {
                status: 400
            });
        }

        if ( !csrfToken ) {
            return new HttpResponse(null, {
                status: 400
            });
        }

        return new HttpResponse(null, {
            status: 204
        });
    }),
];

export default handlers;