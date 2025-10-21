import { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getTranslations({
		locale: routing.defaultLocale,
		namespace: 'manifest',
	});

	return {
		name: t('name'),
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#101E33',
		icons: [
			{
				src: '/favicon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
			},
		],
	};
}
