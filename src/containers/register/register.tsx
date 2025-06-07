'use client';

import Register from '../../components/auth/register';
import { register } from '../../api/client/auth';
import useCsrfToken from '../../hooks/use-csrf-token';
import { useRouter } from 'next/navigation';
import { PublicRoutes } from '../../routes';
import { useState } from 'react';

const RegisterContainer = () => {
    const router = useRouter();
    const getCsrfToken = useCsrfToken();
    const [ status, setStatus ] = useState(null);

    const onRegister = async (data: any) => {
        // const response = await register({...data, csrfToken: await getCsrfToken()});
        // try {
        //     if( response.ok ) {
        //         router.push({pathname: PublicRoutes.login, query: { email: data.email }}, PublicRoutes.login);
        //     } else {
        //         const { message } = await response.json();
        //         setStatus({theme: 'error', lines: [message]});
        //     }
        // } catch (error) {
        //     setStatus({theme: 'error', lines: [ 'Registration failed! Please try again.' ]});
        // }
    }

    return (
        <>
            <Register onRegister={onRegister} status={status}/>
        </>
    )
}

export default RegisterContainer;