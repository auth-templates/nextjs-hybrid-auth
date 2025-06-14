import LoginContainer from "@/containers/login";
import AuthLayout from "@/hoc/auth-layout";
import { LocaleParams } from "@/types/global";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

export async function generateMetadata({ params }: LocaleParams) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.login' });

    return {
        title: t('title'),
        description: t('subtitle'), 
    };
}

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function LoginPage({ params }: Props) {
    const { locale } = use(params);
    const t = useTranslations('pages.login');

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <AuthLayout
            title={t('title')}
            subtitle={t('subtitle')}
        >
            <LoginContainer />
        </AuthLayout>
    );
}