'use client'

import { useState } from 'react';
import { recoverPassword } from '../../api/client/auth';
import useCsrfToken from '../../hooks/use-csrf-token';
import RecoverPassword from "../../components/auth/recover-password";

const RecoverPasswordContainer = () => {
    const [status, setStatus] = useState();
    const getCsrfToken = useCsrfToken();

    const onSend = async (data: any) => {
        const response = await recoverPassword({...data, csrfToken: await getCsrfToken()});
        try {
            if( response.ok ) {
                setStatus({ theme: 'info', lines: [ 'Password reset email sent' ] });
            } else {
                const data = (await response.json());
                setStatus({ theme: 'error', lines: [data.message] });
            }
        } catch (error) {
            setStatus({ theme: 'error', lines: [ 'Failed to send reset password email. Please try again!' ] });
        }
    }
    return (
        <RecoverPassword status={status} onSend={onSend}/>
    );
}

export default RecoverPasswordContainer;