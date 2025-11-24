export type Transaction = {
  id: string;
  category: string;
  paymentMode: string;
  description: string;
  amount: number;
  createdAt: Date;
};