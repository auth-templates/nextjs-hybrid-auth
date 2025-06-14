import RecoverPasswordContainer from "@/containers/recover-password";
import AuthLayout from "@/hoc/auth-layout";
import { LocaleParams } from "@/types/global";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

export async function generateMetadata({ params }: LocaleParams) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'send-reset-password-email' });

    return {
        title: t('title'),
        description: t('subtitle'), 
    };
}

type Props = {
    params: Promise<{ locale: Locale }>;
};

export default function SendResetPasswordEmailPage({ params }: Props) {
    const { locale } = use(params);
    const t = useTranslations('send-reset-password-email');

    // Enable static rendering
    setRequestLocale(locale);

    return (
       <AuthLayout
            title={t('title')}
            subtitle={t('subtitle')}
        >
            <RecoverPasswordContainer />
        </AuthLayout>
    );
}