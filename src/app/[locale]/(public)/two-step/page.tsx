import { getTranslations } from 'next-intl/server';

import AuthLayout from '@/hoc/auth-layout';
import TwoFAContainer from '@/containers/two-fa';

import { LocaleParams } from '@/types/global';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: LocaleParams) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'pages.verify-account' });

	return {
		title: t('title'),
		description: t('subtitle'),
	};
}

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default async function TwoStepPage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations('pages.twoStep');

	// Enable static rendering
	setRequestLocale(locale);

	return (
		<AuthLayout title={t('title')} subtitle={t('subtitle')}>
			<TwoFAContainer />
		</AuthLayout>
	);
}
