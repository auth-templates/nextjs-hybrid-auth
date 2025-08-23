import { notFound } from 'next/navigation';

import { LocaleParams } from '@/types/global';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: LocaleParams) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'pages.not-found' });

	return {
		title: t('title'),
		description: t('subtitle'),
	};
}

export default function CatchAllPage() {
	notFound();
}
