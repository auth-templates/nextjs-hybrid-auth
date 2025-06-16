'use client'

import LoginForm from '@/components/auth/login-form';
import { getCsrfToken } from '@/api/client/csrf';
import { updateOrCreateToast } from '@/services/toast';
import { useMutation } from '@tanstack/react-query';
import { postAuthLoginMutation } from '@/api/generated/@tanstack/react-query.gen';
import { LoginRequest, PostAuthLoginData } from '@/api/generated';

export default function LoginContainer() {
    const { data, error, mutate } = useMutation({...postAuthLoginMutation()});
    console.log("data", data);
    
    const handleLogin = async (data: LoginRequest) => {
        try {
            mutate({
                headers: {
                    'x-csrf-token': await getCsrfToken(),
                },
                body: {
                    ...data
                }
            });
        } catch (error: any) {
            console.log("error", error);
            updateOrCreateToast({containerId: "login-toast-container", toastId: 'uniqueToastId', message: error.message, type: 'error'});
        };
    }

    return (
        <>
            <LoginForm onSubmit={handleLogin}/>
            {/* <Login status={status} onLogin={handleLogin}/> */}
        </>
    )
}