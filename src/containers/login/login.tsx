'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '../../api/client/auth';
import LoginForm from '@/components/auth/login-form';
import { getCsrfToken } from '@/api/client/csrf';
import { updateOrCreateToast } from '@/services/toast';

export default function LoginContainer() {
    const router = useRouter();
    const [ status, setStatus ] = useState();
    
    const handleLogin = async (data: {email: string, password: string}) => {
        try {
            await login(data, await getCsrfToken());
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