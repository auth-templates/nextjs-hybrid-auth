import LogoutContainer from '@/containers/logout';
import { LocaleParams } from '@/types/global';
import { Button } from '@mantine/core';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

export async function generateMetadata({ params }: LocaleParams) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'pages.dashboard' });

	return {
		title: t('title'),
		description: t('subtitle'),
	};
}

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default function Dashboard({ params }: Props) {
	const { locale } = use(params);

	// Enable static rendering
	setRequestLocale(locale);

	return (
		<div>
			<LogoutContainer />
		</div>
	);
}
