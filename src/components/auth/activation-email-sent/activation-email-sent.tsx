import classes from './activation-email-sent.module.css';
import { Container, Card } from '@mantine/core';

type ActivationEmailSentProps = {
	message: string;
};

export default function ActivationEmailSent({ message }: ActivationEmailSentProps) {
	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<div className={classes.message}>{message}</div>
			</Card>
		</Container>
	);
}
