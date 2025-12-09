import { Category } from "../category/type";
import { User } from "../user/type";
import { ECashflow, EPaymentMode } from "./enum";

export type Transaction = {
  id?: string;
  cashflow: ECashflow;
  paymentMode: EPaymentMode;
  description: string;
  amount: number;
  categoryId: string;
  userId: string;
  category?: Category;
  user?: User;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
