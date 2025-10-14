import { Container, Stack, Title, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import AccountContainer from '@/containers/account';
import classes from '@/containers/account/account.module.css';

export default function AccountPage() {
	const t = useTranslations('account');

	return (
		<div className={classes.accountView} data-testid="account-view">
			<Container size="xl">
				<Stack gap="xl">
					<div>
						<Title order={1} mb="sm">
							{t('title')}
						</Title>
						<Text size="sm" c="var(--color-semantic-text-secondary)">
							{t('subtitle')}
						</Text>
					</div>

					<AccountContainer />
				</Stack>
			</Container>
		</div>
	);
}
