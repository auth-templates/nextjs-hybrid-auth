import classes from './reset-password-email-sent.module.css';
import { Container, Card, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

type ResetPasswordEmailSentProps = {
	email: string;
};

export default function ResetPasswordEmailSent({ email }: ResetPasswordEmailSentProps) {
	const t = useTranslations('forms.reset_password_email_sent');

	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<Text className={classes.message}>
					{t.rich('message', {
						email: (chunks) => <span className={classes.email}>{email}</span>,
					})}
				</Text>
			</Card>
		</Container>
	);
}
