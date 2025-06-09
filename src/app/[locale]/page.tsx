import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
 
import {getTranslations} from 'next-intl/server';
import { LocaleParams } from '@/types/global';

import classes from './page.module.css'

export async function generateMetadata({params}: LocaleParams ) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('title')
  };
}

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main className={classes.main}>
        <div className={classes.wrapper}>
            <h1>{t('title')}</h1>
            <Link href="/about">{t('about')}</Link>
        </div>
    </main>
  );
}