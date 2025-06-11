'use client';
import styles from './login-form.module.css';
import { TextInput, Container, Card, Button, Notification, PasswordInput, Title } from '@mantine/core';
import Link from 'next/link';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { login as apiLogin } from '@/api/client/auth';
import Router from 'next/router';
import MediaOptions from '../media-options';
import CustomToastContainer from '@/components/custom-toast-container';
import { useTranslations } from 'next-intl';

type LoginFormProps = {
    onSubmit: (data: any) => void,
}

export default function LoginForm({onSubmit}: LoginFormProps ) {
    const t = useTranslations('pages.login');

    const emailInputId = useId();
    const passwordInputId = useId(); 
    const [error, setError] = useState<string|null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <Title order={2}>Login</Title>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextInput
                        {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            } 
                        })}
                        id={emailInputId}
                        label="Email:"
                        type='email'
                        withAsterisk={false}
                        placeholder="Enter your email"
                        className={styles.emailField}
                        error={errors.email?.message}
                    />
                    <PasswordInput
                        {...register('password',{ required: 'Password is required' })}
                        id={passwordInputId}
                        label="Password:"
                        withAsterisk={false}
                        placeholder="Enter your password"
                        className={styles.passwordField}
                        error={errors.password?.message}
                    />
                    <div className={styles.formLink}>
                        <span>
                            <Link href="/recover-password" className={styles.forgotPassword}>Forgot password?</Link>
                        </span>
                    </div>
                    <CustomToastContainer containerId="login-toast-container" />
                    <Button fullWidth type="submit">Login</Button>
                </form>
                <div className={styles.formLink}>
                    <span>
                        Don't have an account?{' '}
                        <Link href="/signup" className={styles.signupLink}>
                            Sign up
                        </Link>
                    </span>
                </div>
                <MediaOptions />
            </Card>
          </Container>
    );
}