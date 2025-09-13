import classes from './account-verified.module.css';
import { Container, Card, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PublicRoutes } from '../../../routes';

export default function AccountVerified() {
	const t = useTranslations('forms.account_verified');

	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<Text className={classes.message}>
					{t.rich('message', {
						loginLink: (chunks) => (
							<Link href={PublicRoutes.login} className={classes.loginLink}>
								{chunks}
							</Link>
						),
					})}
				</Text>
			</Card>
		</Container>
	);
}
