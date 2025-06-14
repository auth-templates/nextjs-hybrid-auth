'use client';

import { useState } from 'react';
import { resetPassword } from '../../api/client/auth';
import useCsrfToken from '../../hooks/use-csrf-token';
import ResetPassword from "../../components/auth/reset-password";
import { useParams } from 'next/navigation';

const ResetPasswordContainer = () => {
    const { token } = useParams();
    const [status, setStatus] = useState();
    const getCsrfToken = useCsrfToken();

    const onReset = async (data: any) => {
        const response = await resetPassword({...data, token, csrfToken: await getCsrfToken()});
        try {
            if( response.ok ) {
                setStatus({ theme: 'info', lines: [ 'Password updated' ] } as any);
            } else {
                const data = (await response.json());
                setStatus({ theme: 'error', lines: [data.message] });
            }
        } catch (error) {
            setStatus({ theme: 'error', lines: [ 'Failed to reset password. Please try again!' ] });
        }
    }
    return (
        <ResetPassword status={status} onReset={onReset}/>
    );
}

export default ResetPasswordContainer;