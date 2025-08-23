'use client';

import styles from './signup-form.module.css';
import { TextInput, Container, Card, Button, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import MediaOptions from '../media-options';
import { validatePassword } from '@/services/password-rules';
import MessageBox, { Message } from '@/components/message-box';
import { CustomLoadingOverlay } from '@/components/auth/custom-loading-overlay';
import { SignupRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';
import TermsCheckbox from '../terms-checkbox';
import { PublicRoutes } from '@/routes';

type SignupFormProps = {
	onSubmit: (data: SignupRequest) => void;
	loading?: boolean;
	messages?: Message[];
};

export default function SignupForm({ onSubmit, loading, messages }: SignupFormProps) {
	const [loadingInProgress, setLoading] = useState(loading);
	const t = useTranslations('forms.register');

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
			termsAccepted: false,
		},

		validate: {
			email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : t('validation.invalidEmail')),
			password: (value) => (value && validatePassword(value) ? null : t('validation.passwordRules')),
			confirmPassword: (value, values) => (value === values.password ? null : t('validation.passwordsMismatch')),
			termsAccepted: (value) => (value ? null : t('validation.termsRequired')),
		},
	});

	const callSubmit = async (values: typeof form.values) => {
		const { email, password, termsAccepted } = values;
		onSubmit({ email, password, termsAccepted });
	};

	return (
		<Container className={styles.container}>
			<Card className={styles.card}>
				<CustomLoadingOverlay
					visible={loading}
					onTransitionStart={() => setLoading(true)}
					onTransitionEnd={() => setLoading(false)}
				/>
				<form onSubmit={form.onSubmit(callSubmit)} className={styles.form}>
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

					<TermsCheckbox {...form.getInputProps('termsAccepted', { type: 'checkbox' })} />
					{messages && !loadingInProgress && <MessageBox messages={messages} className={styles.messageBox} />}
					<Button fullWidth type="submit">
						{t('buttons.signUp')}
					</Button>
				</form>

				<div className={styles.formLink}>
					<span>
						{t('prompts.haveAccount')}{' '}
						<Link href={PublicRoutes.login} className={styles.loginLink}>
							{t('links.login')}
						</Link>
					</span>
				</div>
				<MediaOptions />
			</Card>
		</Container>
	);
}
