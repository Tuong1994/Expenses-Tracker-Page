"use client"

import { FC } from "react";
import { EPaymentMode } from "@/services/transactions/enum";
import { Badge } from "@/components/UI";
import { useTranslations } from "next-intl";

interface PaymentModeProps {
  paymentMode: EPaymentMode;
}

const PaymentMode: FC<PaymentModeProps> = ({ paymentMode }) => {
  const t = useTranslations("transactions");

  const badgeColor = paymentMode === EPaymentMode.CASH ? "green" : "blue";

  const badgeName = paymentMode === EPaymentMode.CASH ? t('paymentMode.cash') : t('paymentMode.credit');

  return <Badge color={badgeColor}>{badgeName}</Badge>;
};

export default PaymentMode;
