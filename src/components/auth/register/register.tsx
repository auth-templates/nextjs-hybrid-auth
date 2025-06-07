import React, { useEffect, useRef, useState } from 'react';
import classes from './register.module.css';
import Details from './details';
import Credentials from './credentials';
import TermsAndConditions from './terms-and-conditions';
import MessageBox from '../../message-box';
import SmallLoader from '../../small-loader';
import ExistentAccount from '../existent-account/existent-account';
import { validatePassword, PasswordRulesText } from '../../../services/password-rules';
import CaptchaContainer from '../captcha/container';
import { Button } from '@mantine/core';

const Errors = {
    passwordMissmatch: 'Passwords do not match'
}

type RegisterProps = { 
    onRegister: (data: {
        firstname: string,
        lastname: string,
        company: string,
        email: string,
        password: string,
        confirmPassword: string,
        captcha: string,
        toc: boolean
    }) => void,
    status: {
        theme: string, 
        lines: string[]
    } | null,
}

export default function Register({status, onRegister}: RegisterProps) {
    const [ invalidEmail, setInvalidEmail ] = useState(false);
    const [ statusData, setStatus ] = useState<{
        theme: string, 
        lines: string[]
    }|null>();
    const email = useRef(null);
    const [ pending, setPending ] = useState(false);

    useEffect(() => {
        if ( status && status.lines.length > 0 ) {
            status.lines[0] === 'Email is already registered' && setInvalidEmail(true);
        }
        setPending(false);
        setStatus(status);
    }, [status])

    const onSubmit = (event: any) => {
        event.preventDefault();
        email.current = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;
        if( password !== confirmPassword ) {
            setStatus({theme: 'error', lines: [Errors.passwordMissmatch]});
        } else if( !validatePassword(password) ) {
            setStatus({theme: 'error', lines: [PasswordRulesText]})
        } else {
            setStatus(null);
            const data = {
                firstname: event.target.elements.firstname.value,
                lastname: event.target.elements.lastname.value,
                company: event.target.elements.company.value,
                email: email.current,
                password,
                confirmPassword,
                captcha: event.target.elements.captcha.value,
                toc: event.target.elements.checkbox.checked
            }
            setPending(true);
            onRegister(data as any);
        }
    }

    const isPasswordError = () => {
        return statusData && (statusData.lines.includes(Errors.passwordMissmatch) || statusData.lines.includes(PasswordRulesText));
    }

    return (
        <div className={classes.register}>
            <form className={classes.form} onSubmit={onSubmit}>
                <Details />
                <Credentials 
                    invalidPassword={ isPasswordError() as boolean } 
                    invalidEmail={invalidEmail} 
                />
                <CaptchaContainer />
                <TermsAndConditions />
                { 
                    invalidEmail 
                        ? 
                            <ExistentAccount email={email.current as any}/>
                        :
                            statusData && <MessageBox data={statusData}/> 
                }
                { 
                    pending 
                        ?
                            <SmallLoader className={classes.smallLoader} />
                        :
                            <Button type='submit' className={classes.registerButton}>Register</Button> 
                }
            </form>
        </div>
    );
}