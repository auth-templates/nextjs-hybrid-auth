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

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const t = useTranslations('forms.login');

    const emailInputId = useId();
    const passwordInputId = useId();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextInput
                        {...register('email', {
                            required: t('validation.emailRequired'),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('validation.invalidEmail'),
                            },
                        })}
                        id={emailInputId}
                        label={t('labels.email')}
                        type="email"
                        withAsterisk={false}
                        placeholder={t('placeholders.email')}
                        className={styles.emailField}
                        error={errors.email?.message}
                    />
                    <PasswordInput
                        {...register('password', {
                            required: t('validation.passwordRequired'),
                        })}
                        id={passwordInputId}
                        label={t('labels.password')}
                        withAsterisk={false}
                        placeholder={t('placeholders.password')}
                        className={styles.passwordField}
                        error={errors.password?.message}
                    />
                    <div className={styles.formLink}>
                        <span>
                            <Link href="/recover-password" className={styles.forgotPassword}>
                                {t('links.forgotPassword')}
                            </Link>
                        </span>
                    </div>
                    <CustomToastContainer containerId="login-toast-container" />
                    <Button fullWidth type="submit">
                        {t('buttons.login')}
                    </Button>
                </form>
                <div className={styles.formLink}>
                    <span>
                        {t('prompts.noAccount')}{' '}
                        <Link href="/signup" className={styles.signupLink}>
                            {t('links.signUp')}
                        </Link>
                    </span>
                </div>
                <MediaOptions />
            </Card>
        </Container>
    );
}