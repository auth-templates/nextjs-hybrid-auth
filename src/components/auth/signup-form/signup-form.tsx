'use client';

import styles from './signup-form.module.css';
import {
  TextInput,
  Container,
  Card,
  Button,
  Notification,
  PasswordInput,
} from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import MediaOptions from '../media-options';
import { validatePassword } from '@/services/password-rules';
import { SignupRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';
import TermsCheckbox from '../terms-checkbox';

type SignupFormProps = {
  onSubmit: (data: SignupRequest) => void;
  errorMesage?: string;
};

export default function SignupForm({ onSubmit, errorMesage }: SignupFormProps) {
  const t = useTranslations('forms.register');
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },

    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : t('validation.invalidEmail'),
      password: (value) =>
        value && validatePassword(value)
          ? null
          : t('validation.passwordRules'),
      confirmPassword: (value, values) =>
        value === values.password ? null : t('validation.passwordsMismatch'),
      termsAccepted: (value) =>
        value ? null : t('validation.termsRequired'),
    },
  });

  useEffect(() => {
    setError(errorMesage || null);
  }, [errorMesage]);

  const callSubmit = async (values: typeof form.values) => {
    const { email, password, termsAccepted } = values;
    try {
      onSubmit({ email, password, termsAccepted } as any);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <form onSubmit={form.onSubmit(callSubmit)} className={styles.form}>
          {error && (
            <Notification
              color="none"
              withBorder
              classNames={{
                root: styles.notification,
                body: styles.notificationBody,
                description: styles.notificationDescription,
                closeButton: styles.notificationCloseButton,
              }}
              onClose={() => setError(null)}
            >
              {error}
            </Notification>
          )}

          <TextInput
            label={t('labels.email')}
            type="email"
            withAsterisk={false}
            placeholder={t('placeholders.email')}
            className={styles.emailField}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label={t('labels.password')}
            withAsterisk={false}
            placeholder={t('placeholders.password')}
            className={styles.passwordField}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label={t('labels.confirmPassword')}
            withAsterisk={false}
            placeholder={t('placeholders.confirmPassword')}
            className={styles.confirmPasswordField}
            {...form.getInputProps('confirmPassword')}
          />

          <TermsCheckbox
            {...form.getInputProps('termsAccepted', { type: 'checkbox' })}
          />

          <Button fullWidth type="submit">
            {t('buttons.signUp')}
          </Button>
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