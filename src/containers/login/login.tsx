'use client'

import LoginForm from '@/components/auth/login-form';
import { getCsrfToken } from '@/api/client/csrf';
import { useMutation } from '@tanstack/react-query';
import { postAuthLoginMutation } from '@/api/generated/@tanstack/react-query.gen';
import { LoginRequest } from '@/api/generated';

export default function LoginContainer() {
    const { data, error:message, mutate, isPending } = useMutation({...postAuthLoginMutation()});
    
    console.log("data", data);
    console.log("error", message);

    const handleLogin = async (data: LoginRequest) => {
        mutate({
            headers: {
                'x-csrf-token': await getCsrfToken(),
            },
            body: {
                ...data
            }
        });
    }

    return (
        <LoginForm 
            onSubmit={handleLogin} 
            loading={isPending} 
            message={message}
        />
    )
}