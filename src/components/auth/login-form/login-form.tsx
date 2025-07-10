'use client';

import styles from './login-form.module.css';
import {
    TextInput,
    Container,
    Card,
    Button,
    PasswordInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useId, useState } from 'react';
import MediaOptions from '../media-options';
import { useTranslations } from 'next-intl';
import MessageBox, { Message } from '@/components/message-box';
import { CustomLoadingOverlay } from '@/components/auth/custom-loading-overlay';
import { LoginRequest } from '@/api/generated';
import { PublicRoutes } from '@/routes';

type LoginFormProps = {
    onSubmit: (data: LoginRequest) => void;
    loading?: boolean;
    messages?: Message[];
};

export default function LoginForm({ onSubmit, loading, messages }: LoginFormProps) {
    const [loadingInProgress, setLoading] = useState(loading);
    const t = useTranslations('forms.login');

    const emailInputId = useId();
    const passwordInputId = useId();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) =>
                !value
                    ? t('validation.emailRequired')
                    : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ? t('validation.invalidEmail')
                        : null,
            password: (value) => (!value ? t('validation.passwordRequired') : null),
        },
    });

    return (
        <Container className={styles.container}>
            <Card className={styles.card} pos="relative">
                <CustomLoadingOverlay
                    visible={loading}
                    onTransitionStart={() => setLoading(true)}
                    onTransitionEnd={() => setLoading(false)}
                />
                <form onSubmit={form.onSubmit(onSubmit)} className={styles.form}>
                    <TextInput
                        id={emailInputId}
                        label={t('labels.email')}
                        type="email"
                        withAsterisk={false}
                        placeholder={t('placeholders.email')}
                        className={styles.emailField}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        id={passwordInputId}
                        label={t('labels.password')}
                        withAsterisk={false}
                        placeholder={t('placeholders.password')}
                        className={styles.passwordField}
                        {...form.getInputProps('password')}
                    />
                    <div className={styles.formLink}>
                        <span>
                            <Link href={PublicRoutes.recoverPassword} className={styles.forgotPassword}>
                                {t('links.forgotPassword')}
                            </Link>
                        </span>
                    </div>
                    {messages && !loadingInProgress && (
                        <MessageBox messages={messages} className={styles.messageBox} />
                    )}
                    <Button fullWidth type="submit">
                        {t('buttons.login')}
                    </Button>
                </form>
                <div className={styles.formLink}>
                    <span>
                        {t('prompts.noAccount')}{' '}
                        <Link href={PublicRoutes.register} className={styles.signupLink}>
                            {t('links.signUp')}
                        </Link>
                    </span>
                </div>
                <MediaOptions isLogin={true} />
            </Card>
        </Container>
    );
}
