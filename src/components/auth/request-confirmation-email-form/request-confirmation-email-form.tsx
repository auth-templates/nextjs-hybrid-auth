import React, { useState } from 'react';
import styles from './request-confirmation-email-form.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import MessageBox, { Message } from '../../message-box';
import { PublicRoutes } from '../../../routes';
import { Button, Card, Text, TextInput } from '@mantine/core';
import { ResendActivationEmailRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';
import { CustomLoadingOverlay } from '../custom-loading-overlay';
import { useForm } from '@mantine/form';

type RequestConfirmationEmailFormProps = {
	onSubmit: (data: ResendActivationEmailRequest) => void;
	loading?: boolean;
	messages?: Message[];
};

export function RequestConfirmationEmailForm({ messages, loading, onSubmit }: RequestConfirmationEmailFormProps) {
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
		<div className={styles.root}>
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
						{...form.getInputProps('email')}
					/>
					{messages && !loadingInProgress && <MessageBox messages={messages} className={styles.messageBox} />}
					<div className={classNames(styles.actionsGroup)}>
						<div className={styles.subgroup}>
							<Button type="submit" className={styles.sendButton}>
								{t('buttons.resend_confirmation_email_button')}
							</Button>
							<Text size="sm">
								{t.rich('back_to_sign_in', {
									loginLink: (chunks) => (
										<Link href={PublicRoutes.login} passHref>
											{chunks}
										</Link>
									),
								})}
							</Text>
						</div>
					</div>
				</form>
			</Card>
		</div>
	);
}
