import React, { useState } from 'react';
import styles from './request-activation-email-form.module.css';
import Link from 'next/link';
import MessageBox, { Message } from '../../message-box';
import { PublicRoutes } from '../../../routes';
import { Button, Card, TextInput, Container } from '@mantine/core';
import { ResendActivationEmailRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';
import { CustomLoadingOverlay } from '../custom-loading-overlay';
import { useForm } from '@mantine/form';

type RequestActivationEmailFormProps = {
	onSubmit: (data: ResendActivationEmailRequest) => void;
	loading?: boolean;
	messages?: Message[];
};

export function RequestActivationEmailForm({ messages, loading, onSubmit }: RequestActivationEmailFormProps) {
	const [loadingInProgress, setLoading] = useState(loading);
	const t = useTranslations('forms.request_confirmation_email');

	const form = useForm({
		initialValues: {
			userEmail: '',
		},
		validate: {
			userEmail: (value) =>
				!value
					? t('validation.emailRequired')
					: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
						? t('validation.invalidEmail')
						: null,
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
				<form className={styles.form} onSubmit={form.onSubmit(onSubmit)}>
					<TextInput
						label={t('labels.email')}
						type="email"
						withAsterisk={false}
						placeholder={t('placeholders.email')}
						{...form.getInputProps('userEmail')}
					/>
					{messages && !loadingInProgress && <MessageBox messages={messages} className={styles.messageBox} />}
					<Button fullWidth type="submit">
						{t('buttons.resent_activation_email')}
					</Button>
				</form>
				<div className={styles.formLink}>
					<span>
						{t.rich('back_to_sign_in', {
							loginLink: (chunks) => (
								<Link href={PublicRoutes.login} className={styles.loginLink}>
									{chunks}
								</Link>
							),
						})}
					</span>
				</div>
			</Card>
		</Container>
	);
}
