'use client';

import VerifyAccount from '../../components/auth/verify-account';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getCsrfToken, VerifyTokenRequest } from '@/api/generated';
import { postAuthVerifySignupMutation } from '@/api/generated/@tanstack/react-query.gen';

export default function VerifyAccountContainer() {
    const { token } = useParams<{token: string}>();
    const { data, error, mutate, status, isPending } = useMutation({
		...postAuthVerifySignupMutation(),
	})

    useEffect(() => {
        verify({token: token});
    }, [token])

    const verify = async (data: VerifyTokenRequest) => {
        mutate({
            headers: {
                'x-csrf-token': (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken,
            },
            body: {
                ...data
            }
        })
    }

    return (
        <>
            <VerifyAccount messages={error?.messages} />
        </>
    )
}