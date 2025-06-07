'use client';

import ResendConfirmationEmail from '../../components/auth/resend-confirmation-email';
import { resendConfirmationEmail } from '../../api/client/auth';
import useCsrfToken from '../../hooks/use-csrf-token';
import { useState } from 'react';

export default function ResendConfirmationEmailContainer() {
    const getCsrfToken = useCsrfToken();
    const [ status, setStatus ] = useState(null);

    const onResend = async (data) => {
        const response = await resendConfirmationEmail({...data, csrfToken: await getCsrfToken()});
        try {
            if( response.ok ) {
                setStatus({ theme: 'info', lines: [ 'Confirmation email sent' ] });
            } else {
                const { message } = await response.json();
                setStatus({theme: 'error', lines: [message]});
            }
        } catch (error) {
            setStatus({theme: 'error', lines: [ 'Failed to send reset password email. Please try again!' ]});
        }
    }

    return (
        <>
            <ResendConfirmationEmail onResend={onResend} status={status}/>
        </>
    )
}