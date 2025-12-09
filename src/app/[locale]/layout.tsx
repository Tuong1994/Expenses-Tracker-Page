import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { redirect } from "@/i18n/navigation";
import AppMain from "@/components/Page/AppMain";
import FlexProvider from "@/components/UI/Flex/Provider";
import moment from "moment";
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
  params: Promise<{ locale: string; searchParams: Record<string, string | undefined> }>;
}>) {
  const { locale, searchParams } = await params;

  const defaultStart = moment("2025-01-01").format("YYYY-MM-DD");

  const defaultEnd = moment("2025-12-01").format("YYYY-MM-DD");

  const start = searchParams?.startDate;
  const end = searchParams?.endDate;

  // // page chưa có query → redirect để thêm default
  // if (!start || !end) {
  //   return redirect({
  //     href: `?startDate=${start ?? defaultStart}&endDate=${end ?? defaultEnd}`,
  //     locale,
  //   });
  // }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html>
      <body className={poppins.className}>
        <NextIntlClientProvider>
          <FlexProvider>
            <AppMain>
              {children}
              <div id="portal"></div>
            </AppMain>
          </FlexProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
