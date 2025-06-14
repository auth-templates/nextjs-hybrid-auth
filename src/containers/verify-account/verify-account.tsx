'use client';

import VerifyAccount from '../../components/auth/verify-account';
import { verifyAccount } from '../../api/client/auth';
import useCsrfToken from '../../hooks/use-csrf-token';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const VerifyAccountContainer = () => {
    const { token } = useParams();
    const getCsrfToken = useCsrfToken();
    const [ status, setStatus ] = useState();

    useEffect(() => {
        verify({token});
    }, [token])

    const verify = async (data: any) => {
        const response = await verifyAccount({...data, csrfToken: await getCsrfToken()});
        try {
            if( response.ok ) {
                setStatus({ theme: 'info', lines: [ 'Account verified' ] });
            } else {
                const { message } = await response.json();
                setStatus({theme: 'error', lines: [message]});
            }
        } catch (error) {
            setStatus({theme: 'error', lines: [ 'Failed verify account. Please try again!' ]});
        }
    }

    return (
        <>
            <VerifyAccount status={status}/>
        </>
    )
}

export default VerifyAccountContainer;