import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import { getTranslations } from 'next-intl/server';
import { LocaleParams } from '@/types/global';

import classes from './page.module.css'

export async function generateMetadata({ params }: LocaleParams) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title')
    };
}

export default function HomePage() {
    const t = useTranslations('home-page');
    return (
        <div className={classes.layout}>
            <section className={classes.top}>
                <div className={classes.heroContent}>
                    <h1 className={classes.title}>{t('title')}</h1>
                    <p className={classes.subtitle}>{t('subtitle')}</p>
                    <a href="#get-started" className={classes.button}>
                        {t('getStarted')}
                    </a>
                </div>
                <div className={classes.wave}>
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path
                            d="M0,160 C720,320 720,0 1440,160 L1440,320 L0,320 Z"
                            fill="var(--color-background)"
                        />
                    </svg>
                </div>
            </section>

            <section className={classes.bottom} id="get-started">
                <h2>{t('whatsInside')}</h2>
                {t.rich('description', {
                    strong: (chunks) => <strong>{chunks}</strong>,
                })}
                <ul>
                    {Object.keys(t.raw('features')).map((key) => (
                        <li key={key}>
                            {t.rich(`features.${key}`, {
                                code: (chunks) => <code>{chunks}</code>,
                                strong: (chunks) => <strong>{chunks}</strong>,
                            })}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}