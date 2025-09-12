import React, { useState } from 'react';
import styles from './request-password-reset-form.module.css';
import classNames from 'classnames';
import MessageBox, { Message } from '../../message-box';
import { Button, Card, TextInput } from '@mantine/core';
import Link from 'next/link';
import { ResetPasswordRequest } from '@/api/generated';
import { useTranslations } from 'next-intl';
import { PublicRoutes } from '@/routes';
import { Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CustomLoadingOverlay } from '../custom-loading-overlay';

type RequestPasswordResetProps = {
	onSubmit: (data: ResetPasswordRequest) => void;
	loading?: boolean;
	messages?: Message[];
};

export default function RequestPasswordResetForm({ messages, loading, onSubmit }: RequestPasswordResetProps) {
	const [loadingInProgress, setLoading] = useState(loading);
	const t = useTranslations('forms.request_password_reset');

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
								{t('buttons.send_password_reset_email')}
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
