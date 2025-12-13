import { FC } from "react";
import { ECashflow } from "@/services/transactions/enum";
import { Typography } from "@/components/UI";
import utils from "@/utils";

const { Paragraph } = Typography;

interface AmountProps {
  amount: number;
  cashflow: ECashflow;
}

const Amount: FC<AmountProps> = ({ amount, cashflow }) => {
  const isExpense = cashflow === ECashflow.EXPENSE;
  return (
    <Paragraph strong variant={isExpense ? "danger" : "success"}>
      {isExpense ? "-" : null}
      {utils.formatCurrency(amount)}
    </Paragraph>
  );
};

export default Amount;
