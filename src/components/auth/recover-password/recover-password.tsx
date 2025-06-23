import React, { useEffect, useRef, useState } from 'react';
import classes from './recover-password.module.css';
import classNames from 'classnames';
import MessageBox from '../../message-box';
import InexistentAccount from '../inexistent-account';
import ResetPasswordEmailSent from '../reset-password-email-sent';
import AccountNotActive from '../account-not-active';
import { Button, Input, Loader } from '@mantine/core';
import Link from 'next/link';

type RecoverPasswordProps = {
    onSend: (data: {email: string}) => void,
    status: {
        theme: string, 
        lines: string[]
    },
}

const RecoverPassword = ({status, onSend}: RecoverPasswordProps) => {
    const [ invalidEmail, setInvalidEmail ] = useState(false);
    const [ emailSent, setEmailSent ] = useState(false);
    const [ emailNotVerified, setEmailNotVerified] = useState(false);
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
            status.lines[0] === 'Password reset email sent' && setEmailSent(true);
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
        onSend({email: email.current as string});
    }

    return (
        <div className={classes.recoverPassword}>
            {   emailNotVerified
                    ?
                        <AccountNotActive email={email.current as any}/>
                    :
                emailSent 
                    ?
                        <ResetPasswordEmailSent email={email.current as any} />
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
                                        <InexistentAccount email={email.current as any}/> 
                                    : 
                                    statusData && <MessageBox data={statusData}/>
                                }
                                <div className={classes.subgroup}>
                                    { 
                                        pending 
                                            ? 
                                                <Loader /> 
                                            :
                                                <Button type='submit' className={classes.sendButton}>Send reset password email</Button>
                                    }
                                    <div>or go back to <Link 
                                    className={classes.link} 
                                    href="/login" 
                                    /*state={{email: email.current}}*/
                                    > Sign in </Link></div>
                                </div>
                            </div>
                        </form>
            }
        </div>
    );
}
export default RecoverPassword;