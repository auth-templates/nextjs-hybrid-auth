import styles from './verify-account.module.css';
import React, { useState } from 'react';
import MessageBox from '../../message-box';
import ConfirmationEmailExpired from '../confirmation-email-expired';
import AccountVerified from '../account-verified';
import { Card } from '@mantine/core';
import { CustomLoadingOverlay } from '../custom-loading-overlay';
import { Message } from '@/api/generated';

type VerifyAccountProps = {
	loading?: boolean;
	messages?: Message[];
};

export default function VerifyAccount({ loading, messages }: VerifyAccountProps) {
	const [loadingInProgress, setLoading] = useState(loading);

	// Check if account is verified based on messages
	const accountVerified =
		messages?.some((msg) => msg.lines?.some((line) => line.includes('Account verified'))) || false;

	// Check if token is expired based on messages
	const expiredToken =
		messages?.some((msg) => msg.lines?.some((line) => line.includes('Confirmation token is not valid'))) || false;

	return (
		<div className={styles.verifyAccount}>
			<Card className={styles.card} pos="relative">
				<CustomLoadingOverlay
					visible={loading}
					onTransitionStart={() => setLoading(true)}
					onTransitionEnd={() => setLoading(false)}
				/>
				{accountVerified ? (
					<AccountVerified />
				) : expiredToken ? (
					<ConfirmationEmailExpired />
				) : (
					<>
						{messages && !loadingInProgress && (
							<MessageBox messages={messages} className={styles.messageBox} />
						)}
					</>
				)}
			</Card>
		</div>
	);
}
