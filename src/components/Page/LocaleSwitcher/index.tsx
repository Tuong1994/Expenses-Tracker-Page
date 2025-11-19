"use client";

import { FC } from "react";
import { Select } from "@/components/Control";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ELang } from "@/common/enum";
import { ControlColor, SelectOptions } from "@/components/Control/type";
import { SelectProps } from "@/components/Control/Select";
import useLayout from "@/components/UI/Layout/useLayout";

interface LocaleSwitcherProps extends SelectProps {}

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ ...restProps }) => {
  const t = useTranslations("common.translate.switcher");

  const pathname = usePathname();

  const router = useRouter();

  const { layoutValue } = useLayout();

  const options: SelectOptions = routing.locales.map((locale) => ({
    label: locale === ELang.EN ? 'EN' : 'VN',
    value: locale,
  }));

  const handleChange = (value: string | number | boolean) => {
    const newLocale = String(value);

    // Tách path hiện tại, thay locale bằng newLocale
    const segments = pathname.split("/");
    segments[1] = newLocale; // vì segment 0 là "" (do string bắt đầu bằng "/")

    const newPath = segments.join("/");
    router.push(newPath);
  };
  return (
    <Select
      {...restProps}
      hasClear={false}
      hasSearch={false}
      options={options}
      color={layoutValue.layoutColor as ControlColor}
      defaultValue={pathname.split("/")[1]}
      onChangeSelect={handleChange}
    />
  );
};

export default LocaleSwitcher;
