export type Transaction = {
  id?: string;
  cashflow?: string;
  category: string;
  paymentMode: string;
  description: string;
  amount: number;
  createdAt: Date;
};