import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ToastMessage } from "@/components/UI";
import { ApiResponse } from "@/services/type";
import { User } from "@/services/user/type";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getUser } from "@/services/user/api";
import { ELang } from "@/common/enum";
import AppMain from "@/components/Page/AppMain";
import FlexProvider from "@/components/UI/Flex/Provider";
import cookieKey from "@/common/constant/cookies";
import "@/style/globals.css";
import "@/style/main.scss";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const tokenPayload = (await cookies()).get(cookieKey.TOKEN)?.value;

  let user: ApiResponse<User> | null = null;

  const isAuth = Boolean(tokenPayload);

  if (isAuth) user = await getUser({ langCode: locale as ELang });

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html>
      <body className={poppins.className}>
        <NextIntlClientProvider>
          <FlexProvider>
            <AppMain user={user} isAuth={isAuth}>
              {children}
              <div id="portal"></div>
              <ToastMessage />
            </AppMain>
          </FlexProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
