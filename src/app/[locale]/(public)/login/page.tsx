import LoginContainer from "@/containers/login";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function PathnamesPage({params}: Props) {
  const { locale } = use(params);

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <LoginContainer />
    );
}