'use client';
import styles from './signup-form.module.css';
import { TextInput, Container, Card, Button, Notification, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { register as apiRegister } from '../../api/auth';
import Router from 'next/router';
import MediaOptions from '../media-options';
import { PasswordRulesText, validatePassword } from '@/services/password-rules';

const SignupForm = () => {
    const emailInputId = useId();
    const passwordInputId = useId(); 
    const confirmPasswordInputId = useId(); 
    const [error, setError] = useState<string|null>(null);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data:any) => {
        try {
            await apiRegister(data);
            Router.push('/dashboard');
        } catch (error: any) {
            console.log("ERROR", error);
            setError(error)
        }
    };

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                { error && (
                    <Notification
                        color="none"
                        withBorder={true}
                        classNames={{
                            root: styles.notification,
                            body: styles.notificationBody,
                            description: styles.notificationDescription,
                            closeButton: styles.notificationCloseButton
                        }}
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Notification>
                )}
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
                        {...register('password', { 
                            required: 'Password is required',
                            validate: (value: string) => {
                                if ( !validatePassword(value) ) {
                                    return PasswordRulesText;
                                }
                            }, 
                        })}
                        id={passwordInputId}
                        label="Password:"
                        withAsterisk={false}
                        placeholder="Enter your password"
                        className={styles.passwordField}
                        error={errors.password?.message}
                    />
                    <PasswordInput
                        {...register('confirmPassword', { 
                            required: 'Confirming your password is required',
                            validate: (value: string) => {
                                if ( watch('password') !== value ) {
                                    return "Passwords do no match";
                                }
                            },  
                        })}
                        id={confirmPasswordInputId}
                        label="Confirm password:"
                        withAsterisk={false}
                        placeholder="Retype your password"
                        className={styles.confirmPasswordField}
                        error={errors.confirmPassword?.message}
                    />
                    <Button fullWidth type="submit">Login</Button>
                </form>
                <div className={styles.formLink}>
                    <span>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.loginLink}>
                            Login
                        </Link>
                    </span>
                </div>
                <MediaOptions />
            </Card>
          </Container>
    );
}

export default SignupForm;