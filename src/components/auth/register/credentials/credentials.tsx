import React, { useEffect, useState } from 'react';
import classes from './credentials.module.css';
import { Input, PasswordInput } from '@mantine/core';

type CredentialsProps = {
    invalidPassword: boolean,
    invalidEmail: boolean,
}

export default function Credentials(props: CredentialsProps) {
    const [ invalidPassword, setInvalidPassword ] = useState(false);
    const [ invalidEmail, setInvalidEmail ] = useState(false);
 
    useEffect(() => {
        setInvalidPassword(props.invalidPassword);
        setInvalidEmail(props.invalidEmail);
    }, [props])

    const handleFocus = () => {
        setInvalidPassword(false);
        setInvalidEmail(false);
    }

    return (
        <div className={classes.credentials}>
            <div className={classes.group}>
                <label htmlFor='email'>Email</label>
                <Input 
                    id="email" 
                    name="email"
                    variant={invalidEmail ? 'danger' : undefined}
                    required
                    onFocus={handleFocus}
                />
            </div>
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
        </div>
    )
}