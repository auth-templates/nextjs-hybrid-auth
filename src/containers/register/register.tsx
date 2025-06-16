'use client';

import useCsrfToken from '../../hooks/use-csrf-token';
import { useRouter } from 'next/navigation';
import { PublicRoutes } from '../../routes';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postAuthSignupMutation } from '@/api/generated/@tanstack/react-query.gen';
import { SignupRequest } from '@/api/generated';
import { updateOrCreateToast } from '@/services/toast';
import SignupForm from '@/components/auth/signup-form';

const RegisterContainer = () => {
    const getCsrfToken = useCsrfToken();
    const router = useRouter();
    const { data, error, mutate, status } = useMutation({...postAuthSignupMutation()});
    console.log("data", data);
    
    useEffect(() => {
        if ( status === 'success' ) {
            router.push(PublicRoutes.login);
        }
    }, [status])

    const onRegister = async (data: SignupRequest) => {
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
            <SignupForm onSubmit={onRegister} errorMesage={error?.message}/>
        </>
    )
}

export default RegisterContainer;