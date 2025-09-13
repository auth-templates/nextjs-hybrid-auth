import classes from './activation-email-sent.module.css';
import { Container, Card, Text } from '@mantine/core';

type ActivationEmailSentProps = {
	message: string;
};

export default function ActivationEmailSent({ message }: ActivationEmailSentProps) {
	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<Text className={classes.message}>{message}</Text>
			</Card>
		</Container>
	);
}
