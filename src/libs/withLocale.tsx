import { setRequestLocale } from "next-intl/server";
import type { ComponentType } from "react";

const DEFAULT_LOCALE = "en";

export default function withLocale<P>(Component: ComponentType<P & { locale: string }>) {
  return async function Wrapper({ params, ...rest }: { params: Promise<{ locale: string }> } & P) {
    let locale = DEFAULT_LOCALE;

    if (params) {
      const resolved = await params;
      locale = resolved?.locale ?? DEFAULT_LOCALE;
    }
    
    setRequestLocale(locale);

    return <Component {...(rest as P)} locale={locale} />;
  };
}
