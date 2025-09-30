import styles from './reset-password-form.module.css';
import React, { useState } from 'react';

import MessageBox, { Message } from '../../message-box';
import { Button, Card, PasswordInput, Container } from '@mantine/core';
import { ConfirmResetPasswordRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';
import { useForm } from '@mantine/form';
import { validatePassword } from '@/services/password-rules';
import { CustomLoadingOverlay } from '../custom-loading-overlay';

type ResetPasswordFormProps = {
	onSubmit: (data: Omit<ConfirmResetPasswordRequest, 'token'>) => void;
	loading?: boolean;
	messages?: Message[];
};

export default function ResetPasswordForm({ onSubmit, loading, messages }: ResetPasswordFormProps) {
	const [loadingInProgress, setLoading] = useState(loading);
	const t = useTranslations('forms.reset_password');

	const form = useForm({
		initialValues: {
			password: '',
			confirmPassword: '',
		},

		validate: {
			password: (value) => (value && validatePassword(value) ? null : t('validation.passwordRules')),
			confirmPassword: (value, values) => (value === values.password ? null : t('validation.passwordsMismatch')),
		},
	});

	const callSubmit = async (values: typeof form.values) => {
		const { password } = values;
		onSubmit({ password: password });
	};

	return (
		<Container className={styles.container}>
			<Card className={styles.card} pos="relative">
				<CustomLoadingOverlay
					visible={loading}
					onTransitionStart={() => setLoading(true)}
					onTransitionEnd={() => setLoading(false)}
				/>
				<form className={styles.form} onSubmit={form.onSubmit(callSubmit)}>
					<PasswordInput
						label={t('labels.password')}
						withAsterisk={false}
						placeholder={t('placeholders.password')}
						{...form.getInputProps('password')}
					/>
					<PasswordInput
						label={t('labels.confirmPassword')}
						withAsterisk={false}
						placeholder={t('placeholders.confirmPassword')}
						{...form.getInputProps('confirmPassword')}
					/>
					{messages && !loadingInProgress && <MessageBox messages={messages} className={styles.messageBox} />}
					<Button fullWidth type="submit">
						{t('buttons.reset_password')}
					</Button>
				</form>
			</Card>
		</Container>
	);
}
