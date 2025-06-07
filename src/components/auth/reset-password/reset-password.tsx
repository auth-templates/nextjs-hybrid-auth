import classes from './reset-password.module.css';
import { validatePassword, PasswordRulesText } from '../../../services/password-rules';
import React, { useEffect, useState } from 'react';
import CaptchaContainer from '../captcha';
import PasswordUpdated from '../password-updated';
import ResetPasswordMailExpired from '../reset-password-email-expired';
import SmallLoader from '../../small-loader';
import MessageBox from '../../message-box';
import { Button, PasswordInput } from '@mantine/core';

const Errors = {
    passwordMissmatch: 'Passwords do not match'
}

type ResetPasswordProps = { 
    onReset: (data: any) => void,
    status: {
        theme: string, 
        lines: string[]
    },
}

export default function ResetPassword({status, onReset}: ResetPasswordProps) {
    const [ invalidPassword, setInvalidPassword ] = useState(false);
    const [ passwordUpdated, setPasswordUpdated ] = useState(false);
    const [ expiredToken, setExpiredToken ] = useState(false);
    const [ statusData, setStatus ] = useState<{
        theme: string, 
        lines: string[]
    }| null>();
    const [ pending, setPending ] = useState(false);
    
    useEffect(() => {
        if ( status && status.lines.length > 0 ) {
            status.lines[0] === 'Password updated' && setPasswordUpdated(true);
            status.lines[0] === 'Reset token is not valid' && setExpiredToken(true);
        }
        setPending(false);
        setStatus(status);
    }, [status])

    const onSubmit = (event: any) => {
        event.preventDefault();
        const password = event.target.elements.password.value;
        const confirmPassword = event.target.elements.confirmPassword.value;
        if( password !== confirmPassword ) {
            setStatus({theme: 'error', lines: [Errors.passwordMissmatch]});
            setInvalidPassword(true);
        } else if( !validatePassword(password) ) {
            setStatus({theme: 'error', lines: [PasswordRulesText]});
            setInvalidPassword(true);
        } else {
            setStatus(null);
            const data = {
                password,
                confirmPassword,
                captcha: event.target.elements.captcha.value,
            }
            setPending(true);
            onReset(data);
        }
    }

    const handleFocus = () => {
        setInvalidPassword(false);
    }

    return (
        <div className={classes.resetPassword}>
            {
                expiredToken 
                ?
                    <ResetPasswordMailExpired />
                :
                passwordUpdated
                ?
                    <PasswordUpdated />
                :
                    <form className={classes.form} onSubmit={onSubmit}>
                        <div className={classes.group}>
                            <label htmlFor='password'>Password</label>
                            <PasswordInput 
                                id="password" 
                                name="password"
                                variant={invalidPassword ? 'danger' : undefined} 
                                required
                                onFocus={handleFocus}
                            />
                        </div>
                        <div className={classes.group}>
                            <label htmlFor='confirmPassword'>Confirm password</label>
                            <PasswordInput 
                                id="confirmPassword" 
                                name="confirmPassword"
                                variant={invalidPassword ? 'danger' : undefined} 
                                required
                                onFocus={handleFocus}
                            />
                        </div>
                        <CaptchaContainer />
                        { 
                            statusData && <MessageBox data={statusData}/> 
                        }
                        { 
                            pending
                                ?
                                    <SmallLoader className={classes.smallLoader} />
                                :
                                    <Button type='submit' className={classes.resetButton}>Reset password</Button> 
                        }
                    </form>
            }
        </div>
    )
}