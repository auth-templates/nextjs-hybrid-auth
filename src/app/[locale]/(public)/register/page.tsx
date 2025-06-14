import RegisterContainer from "@/containers/register";
import AuthLayout from "@/hoc/auth-layout";
import { use } from "react";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocaleParams } from "@/types/global";

export async function generateMetadata({ params }: LocaleParams) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.register' });

    return {
        title: t('title'),
        description: t('subtitle'), 
    };
}

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function RegisterPage({params}: Props) {
    const { locale } = use(params);
    const t = useTranslations('pages.register');
    
    // Enable static rendering
    setRequestLocale(locale);

    return (
       <AuthLayout
            title={t('title')}
            subtitle={t('subtitle')}
        >
            <RegisterContainer />
        </AuthLayout>
    );
}