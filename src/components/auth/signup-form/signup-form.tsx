'use client';

import styles from './signup-form.module.css';
import { TextInput, Container, Card, Button, Notification, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import MediaOptions from '../media-options';
import { validatePassword } from '@/services/password-rules';
import { SignupRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';

type SignupFormProps = {
    onSubmit: (data: SignupRequest) => void
    errorMesage?: string
}

export default function SignupForm({ onSubmit, errorMesage }: SignupFormProps) {
    const t = useTranslations('forms.register');
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        setError(errorMesage || null);
    }, [errorMesage]);

    const callSubmit = async (data: any) => {
        try {
            onSubmit(data);
        } catch (error: any) {
            setError(error);
        }
    };

    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                <form onSubmit={handleSubmit(callSubmit)} className={styles.form}>
                    {error && (
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
                            required: t('validation.emailRequired'),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('validation.invalidEmail')
                            }
                        })}
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
                            validate: (value: string) => {
                                if (!validatePassword(value)) {
                                    return t('validation.passwordRules');
                                }
                            }
                        })}
                        label={t('labels.password')}
                        withAsterisk={false}
                        placeholder={t('placeholders.password')}
                        className={styles.passwordField}
                        error={errors.password?.message}
                    />
                    <PasswordInput
                        {...register('confirmPassword', {
                            required: t('validation.confirmPasswordRequired'),
                            validate: (value: string) => {
                                if (watch('password') !== value) {
                                    return t('validation.passwordsMismatch');
                                }
                            }
                        })}
                        label={t('labels.confirmPassword')}
                        withAsterisk={false}
                        placeholder={t('placeholders.confirmPassword')}
                        className={styles.confirmPasswordField}
                        error={errors.confirmPassword?.message}
                    />
                    <Button fullWidth type="submit">{t('buttons.signUp')}</Button>
                </form>
                <div className={styles.formLink}>
                    <span>
                        {t('prompts.haveAccount')}{' '}
                        <Link href="/login" className={styles.loginLink}>
                            {t('links.login')}
                        </Link>
                    </span>
                </div>
                <MediaOptions />
            </Card>
        </Container>
    );
}