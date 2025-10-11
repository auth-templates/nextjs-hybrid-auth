'use client';

import styles from './two-fa-form.module.css';
import { PinInput, Container, Card, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import MessageBox, { Message } from '@/components/message-box';
import { CustomLoadingOverlay } from '@/components/auth/custom-loading-overlay';

type TwoFAFormProps = {
	onSubmit: (data: { code: string }) => void;
	loading?: boolean;
	messages?: Message[];
};

export default function TwoFAForm({ onSubmit, loading, messages }: TwoFAFormProps) {
	const [loadingInProgress, setLoading] = useState(loading);
	const t = useTranslations('forms.twoFA');

	const codeInputId = useId();

	const form = useForm({
		initialValues: {
			code: '',
		},

		validate: {
			code: (value) => {
				if (!value) {
					return t('validation.codeRequired');
				}
				if (value.length !== 6) {
					return t('validation.invalidCode');
				}
				return null;
			},
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
					<div>
						<Text size="sm" fw={500} mb={5} c="var(--color-semantic-text-primary)">
							{t('labels.code')}
						</Text>
						<PinInput
							id={codeInputId}
							length={6}
							type="number"
							placeholder="○"
							{...form.getInputProps('code')}
						/>
						{form.errors.code && (
							<Text size="xs" c="var(--color-semantic-text-error)" mt={5}>
								{form.errors.code}
							</Text>
						)}
					</div>
					{messages && !loadingInProgress && <MessageBox messages={messages} className={styles.messageBox} />}
					<Button fullWidth type="submit">
						{t('buttons.verify')}
					</Button>
				</form>
			</Card>
		</Container>
	);
}
