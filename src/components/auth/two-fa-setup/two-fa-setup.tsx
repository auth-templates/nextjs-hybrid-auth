'use client';

import React, { useState } from 'react';
import { Card, Button, Text, Container, Group, Stack, Divider, Alert } from '@mantine/core';
import { IconShield, IconQrcode, IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	post2FaSetupMutation,
	post2FaVerifySetupMutation,
	delete2FaDisableMutation,
	getAuthSessionQueryKey,
	getAuthSessionOptions,
} from '@/api/generated/@tanstack/react-query.gen';
import { getCsrfToken } from '@/api/generated';
import { useTranslations } from 'next-intl';
import MessageBox, { Message } from '@/components/message-box';
import { CustomLoadingOverlay } from '@/components/auth/custom-loading-overlay';
import styles from './two-fa-setup.module.css';

type TwoFASetupProps = {
	user?: {
		enabled2FA?: boolean | null;
		email?: string;
	};
	onStatusChange?: () => void;
};

type SetupState = 'idle' | 'setup' | 'verifying' | 'success' | 'error';

export default function TwoFASetup({ user, onStatusChange }: TwoFASetupProps) {
	const [setupState, setSetupState] = useState<SetupState>('idle');
	const [qrCodeData, setQrCodeData] = useState<{ qrCodeUrl: string; secret: string } | null>(null);
	const [verificationCode, setVerificationCode] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const t = useTranslations('account.twoFA');

	// Get current user session
	const { data: sessionData, refetch: refetchSession } = useQuery({
		...getAuthSessionOptions(),
		queryKey: getAuthSessionQueryKey(),
	});

	const currentUser = user || sessionData?.user;

	// Setup 2FA mutation
	const setupMutation = useMutation({
		...post2FaSetupMutation(),
		onSuccess: (data) => {
			if (data.qrCodeUrl && data.secret) {
				setQrCodeData({ qrCodeUrl: data.qrCodeUrl, secret: data.secret });
				setSetupState('setup');
				setMessages([]);
			} else {
				setMessages([{ text: t('setupError'), severity: 'error' }]);
				setSetupState('error');
			}
		},
		onError: (error) => {
			setMessages(error.messages || [{ text: t('setupError'), severity: 'error' }]);
			setSetupState('error');
		},
	});

	// Verify 2FA setup mutation
	const verifyMutation = useMutation({
		...post2FaVerifySetupMutation(),
		onSuccess: () => {
			setSetupState('success');
			setMessages([{ text: t('successMessage'), severity: 'success' }]);
			refetchSession();
			onStatusChange?.();
		},
		onError: (error) => {
			setMessages(error.messages || [{ text: t('verifyError'), severity: 'error' }]);
			setSetupState('error');
		},
	});

	// Disable 2FA mutation
	const disableMutation = useMutation({
		...delete2FaDisableMutation(),
		onSuccess: () => {
			setMessages([{ text: t('disabledMessage'), severity: 'success' }]);
			refetchSession();
			onStatusChange?.();
		},
		onError: (error) => {
			setMessages(error.messages || [{ text: t('disableError'), severity: 'error' }]);
		},
	});

	const handleSetup2FA = async () => {
		try {
			const csrfToken = (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken;
			setupMutation.mutate({
				headers: {
					'x-csrf-token': csrfToken as string,
				},
			});
		} catch (error) {
			setMessages([{ text: t('csrfError'), severity: 'error' }]);
		}
	};

	const handleVerify2FA = async () => {
		if (!verificationCode || verificationCode.length !== 6) {
			setMessages([{ text: t('invalidCodeError'), severity: 'error' }]);
			return;
		}

		try {
			const csrfToken = (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken;
			verifyMutation.mutate({
				headers: {
					'x-csrf-token': csrfToken as string,
				},
				body: {
					code: verificationCode,
				},
			});
		} catch (error) {
			setMessages([{ text: t('csrfError'), severity: 'error' }]);
		}
	};

	const handleDisable2FA = async () => {
		if (!confirm(t('disableConfirmMessage'))) {
			return;
		}

		try {
			const csrfToken = (await getCsrfToken({ cache: 'no-store' })).data?.csrfToken;
			disableMutation.mutate({
				headers: {
					'x-csrf-token': csrfToken as string,
				},
			});
		} catch (error) {
			setMessages([{ text: t('csrfError'), severity: 'error' }]);
		}
	};

	const resetSetup = () => {
		setSetupState('idle');
		setQrCodeData(null);
		setVerificationCode('');
		setMessages([]);
	};

	const is2FAEnabled = currentUser?.enabled2FA === true;
	const isLoading = setupMutation.isPending || verifyMutation.isPending || disableMutation.isPending;

	return (
		<Card className={styles.card} pos="relative">
			<CustomLoadingOverlay visible={isLoading} />

			<Stack gap="md">
				<Group justify="space-between" align="center">
					<Group gap="sm" align="center">
						<IconShield size={24} color="var(--color-semantic-text-primary)" />
						<Text size="lg" fw={600} c="var(--color-semantic-text-primary)">
							{t('title')}
						</Text>
					</Group>
					{is2FAEnabled && (
						<Group gap="xs" align="center">
							<IconCheck size={16} color="var(--color-semantic-text-success)" />
							<Text size="sm" c="var(--color-semantic-text-success)">
								{t('enabled')}
							</Text>
						</Group>
					)}
				</Group>

				<Text size="sm" c="var(--color-semantic-text-secondary)" ta="left">
					{t('description')}
				</Text>

				{messages.length > 0 && <MessageBox messages={messages} />}

				{!is2FAEnabled && setupState === 'idle' && (
					<Group justify="flex-start" align="center">
						<Button
							leftSection={<IconShield size={16} color="var(--color-semantic-text-on-primary)" />}
							onClick={handleSetup2FA}
							loading={setupMutation.isPending}
						>
							{t('enableButton')}
						</Button>
					</Group>
				)}

				{!is2FAEnabled && setupState === 'setup' && qrCodeData && (
					<Stack gap="md">
						<Alert icon={<IconQrcode size={16} />} color="blue" variant="light">
							<Text size="sm">{t('qrCodeInstructions')}</Text>
						</Alert>

						<div className={styles.qrCodeContainer}>
							<img
								src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData.qrCodeUrl)}`}
								alt="2FA QR Code"
								className={styles.qrCode}
							/>
						</div>

						<Text size="xs" c="var(--color-semantic-text-secondary)">
							{t('manualSecretLabel')} <span className={styles.codeBlock}>{qrCodeData.secret}</span>
						</Text>

						<Divider />

						<Stack gap="sm">
							<Text size="sm" fw={500}>
								{t('verificationInstructions')}
							</Text>
							<input
								type="text"
								value={verificationCode}
								onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
								placeholder="123456"
								className={styles.codeInput}
								maxLength={6}
							/>
							<Group gap="sm">
								<Button
									onClick={handleVerify2FA}
									loading={verifyMutation.isPending}
									disabled={verificationCode.length !== 6}
								>
									{t('verifyButton')}
								</Button>
								<Button variant="outline" onClick={resetSetup}>
									{t('cancelButton')}
								</Button>
							</Group>
						</Stack>
					</Stack>
				)}

				{!is2FAEnabled && setupState === 'success' && (
					<Alert icon={<IconCheck size={16} />} color="green" variant="light">
						<Text size="sm">{t('successMessage')}</Text>
					</Alert>
				)}

				{is2FAEnabled && (
					<Group justify="flex-start" align="center">
						<Button
							variant="outline"
							color="red"
							leftSection={<IconX size={16} />}
							onClick={handleDisable2FA}
							loading={disableMutation.isPending}
						>
							{t('disableButton')}
						</Button>
					</Group>
				)}

				{setupState === 'error' && (
					<Group justify="flex-start" align="center">
						<Button variant="outline" onClick={resetSetup}>
							{t('tryAgainButton')}
						</Button>
					</Group>
				)}
			</Stack>
		</Card>
	);
}
