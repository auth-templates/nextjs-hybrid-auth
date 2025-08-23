import ResetPasswordContainer from '@/containers/reset-password';
import AuthLayout from '@/hoc/auth-layout';
import { LocaleParams } from '@/types/global';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

export async function generateMetadata({ params }: LocaleParams) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'pages.reset-password' });

	return {
		title: t('title'),
		description: t('subtitle'),
	};
}

type Props = {
	params: Promise<{ locale: Locale }>;
};

export default function ResetPasswordPage({ params }: Props) {
	const { locale } = use(params);
	const t = useTranslations('pages.reset-password');

	// Enable static rendering
	setRequestLocale(locale);

	return (
		<AuthLayout title={t('title')} subtitle={t('subtitle')}>
			<ResetPasswordContainer />
		</AuthLayout>
	);
}
