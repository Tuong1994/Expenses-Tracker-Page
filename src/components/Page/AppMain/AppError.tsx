import { FC } from "react";
import { Paragraph } from "@/components/UI/Typography";
import { Space } from "@/components/UI";
import { getTranslations } from "next-intl/server";
import { CiFaceFrown } from "react-icons/ci";
import AuthMain from "@/features/auth/components/AuthMain";

const AppError: FC = async () => {
  const t = await getTranslations("common.message");

  return (
    <AuthMain>
      <Space justify="center" rootClassName="mb-5!">
        <CiFaceFrown size={80} />
      </Space>
      <Paragraph size={16}>{t("error.app")}</Paragraph>
    </AuthMain>
  );
};

export default AppError;
