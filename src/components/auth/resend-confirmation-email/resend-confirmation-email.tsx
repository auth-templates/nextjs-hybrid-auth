import React, { useEffect, useRef, useState } from 'react';
import classes from './resend-confirmation-email.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import MessageBox from '../../message-box';
import SmallLoader from '../../small-loader';
import InexistentAccount from '../inexistent-account';
import ConfirmationEmailSent from '../confirmation-email-sent';
import AccountNotActive from '../account-not-active';
import { PublicRoutes } from '../../../routes';
import { Button, Input } from '@mantine/core';

type ResendConfirmationEmail = {
    onResend: (data: {email: string}) => void,
    status: {
        theme: string, 
        lines: string[]
    },
}

export default function ResendConfirmationEmail({status, onResend}: ResendConfirmationEmail) {
    const [ invalidEmail, setInvalidEmail ] = useState(false);
    const [ emailSent, setEmailSent ] = useState(false);
    const [ emailNotVerified, setEmailNotVerified ] = useState(false);
    const [ pending, setPending ] = useState(false);
    const [ statusData, setStatusData ] = useState<{
        theme: string, 
        lines: string[]
    }|null>();
    const email = useRef<string|null>(null);
    
    useEffect(() => {
        setPending(false);

        if ( status && status.lines.length > 0 ) {
            status.lines[0] === 'Email is invalid' && setInvalidEmail(true);
            status.lines[0] === 'Confirmation email sent' && setEmailSent(true);
            status.lines[0] === 'Email is not verified' && setEmailNotVerified(true);
        }

        setStatusData(status);
    }, [status])

    const handleFocus = () => {
        invalidEmail && setInvalidEmail(false);
        setStatusData(null);
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        email.current = event.target.elements.email.value;
        onResend({email: email.current as string});
    }

    return (
        <div className={classes.resendConfirmationEmail}>
            {   emailNotVerified
                    ?
                        <AccountNotActive email={email.current as string}/>
                    :
                emailSent 
                    ?
                        <ConfirmationEmailSent email={email.current as string} />
                    :
                        <form className={classes.form} onSubmit={onSubmit}>
                            <div className={classes.group}>
                                <label htmlFor='email'>Email</label>
                                <Input 
                                    id="email" 
                                    name="email"
                                    variant={invalidEmail ? 'danger' : undefined}
                                    type="email" 
                                    onFocus={handleFocus}
                                    required
                                />
                            </div>
                            <div className={classNames(classes.actionsGroup)}>
                                {
                                    invalidEmail 
                                    ? 
                                        <InexistentAccount email={email.current as string}/> 
                                    : 
                                    statusData && <MessageBox data={statusData}/>
                                }
                                <div className={classes.subgroup}>
                                    { 
                                        pending 
                                            ? 
                                                <SmallLoader /> 
                                            :
                                                <Button type='submit' className={classes.sendButton}>Resend confirmation email</Button>
                                    }
                                    <div>
                                        or go back to <Link 
                                            className={classes.link} 
                                            href={`${PublicRoutes.login}?email=${email.current}`} 
                                            as={PublicRoutes.login}
                                        > Sign in </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
            }
        </div>
    );
}