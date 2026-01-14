import { setRequestLocale } from "next-intl/server";
import type { ComponentType } from "react";

const DEFAULT_LOCALE = "en";

export default function withLocale<P>(Component: ComponentType<P & { locale: string }>) {
  return async function Wrapper({
    params,
    ...rest
  }: { params: Promise<{ locale: string; [key: string]: string }> } & P) {
    let locale = DEFAULT_LOCALE;
    let resetPasswordToken = "";

    if (params) {
      const resolved = await params;
      locale = resolved?.locale ?? DEFAULT_LOCALE;
      resetPasswordToken = resolved?.token ?? "";
    }

    setRequestLocale(locale);

    return <Component {...(rest as P)} locale={locale} resetPasswordToken={resetPasswordToken} />;
  };
}
