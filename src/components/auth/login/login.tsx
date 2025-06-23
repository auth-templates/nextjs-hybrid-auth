import Link from 'next/link';
import React, { useRef, useState } from 'react';
import classes from './login.module.css';
import classNames from 'classnames';
import { PublicRoutes } from '../../../routes';
import { Button, Loader, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dictionary } from '@/dictionary';

type LoginProps = { 
    onLogin: (data: {email: string, password: string}) => void,
    status: {
        theme: string, 
        lines: string[]
    },
}

export default function Login({onLogin}: LoginProps) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          password: '',
        },
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const [ pending, setPending ] = useState(false);
    const email = useRef(null);

    const onSubmit = ({email, password}: {email: string, password: string}) => {
        setPending(true);
        onLogin({email, password});
        setPending(false);
    }
    console.log("valid", form.isValid('email'));
    return (
        <form 
            onSubmit={form.onSubmit((values: any) => onSubmit(values))} 
            className={classes.login}
        >
            <TextInput 
                type="email"
                withAsterisk
                label={Dictionary.email}
                name="email"
                placeholder="your@email.com"
                key={form.key('email')}
                variant={form.isValid('email') ? 'default' : 'danger'}
                {...form.getInputProps('email')}
                required
            />
            <PasswordInput
                label={Dictionary.password}
                type="password"
                name="password"
                // variant={invalidPassword ? 'danger' : undefined} 
                key={form.key('password')}
                {...form.getInputProps('password')}
                required
            />
            <div className={classNames(classes.actionsGroup)}>
                <div className={classes.subgroup}>
                    { 
                        pending ? ( 
                            <Loader /> 
                        ) : (
                            <Button type='submit' className={classes.loginButton}>Login</Button>
                        )
                    }
                    <span className={classes.forgotPasswordQuestion}>
                        <Link 
                            className={classes.link} 
                            href={`${PublicRoutes.recoverPassword}?email=${email.current}`} 
                            as={PublicRoutes.recoverPassword}
                        > 
                            {Dictionary.forgotYourPassword}
                        </Link>
                    </span>
                </div>
                <div className={classes.subgroup}>
                    <span> {Dictionary.dontHaveAnAccount} 
                        <Link 
                            className={classes.link} 
                            href={`${PublicRoutes.register}?email=${email.current}}`} 
                            as={PublicRoutes.register}
                        >
                            {Dictionary.signUp} 
                        </Link>
                    </span>
                    <span>
                        <Link 
                            className={classes.link} 
                            href={`${PublicRoutes.resendConfirmationEmail}?email=${email.current}}`} 
                            as={PublicRoutes.resendConfirmationEmail}
                        > 
                            {Dictionary.resendConfirmationEmail} 
                        </Link>
                    </span>
                </div>
            </div>
        </form>
    );
}