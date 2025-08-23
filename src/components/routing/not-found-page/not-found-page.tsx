import classes from './not-found-page.module.css';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
	const t = useTranslations('pages.not-found');

	return (
		<div className={classes.root}>
			<h1>{t('title')}</h1>
			<p className="max-w-[460px]">{t('subtitle')}</p>
		</div>
	);
}
