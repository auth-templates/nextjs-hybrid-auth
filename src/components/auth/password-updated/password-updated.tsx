import classes from './password-updated.module.css';
import { Container, Card } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PublicRoutes } from '../../../routes';

export default function PasswordUpdated() {
	const t = useTranslations('forms.password_updated');

	return (
		<Container className={classes.container}>
			<Card className={classes.card}>
				<div className={classes.message}>
					{t.rich('message', {
						loginLink: (chunks) => (
							<Link href={PublicRoutes.login} className={classes.loginLink}>
								{chunks}
							</Link>
						),
					})}
				</div>
			</Card>
		</Container>
	);
}
