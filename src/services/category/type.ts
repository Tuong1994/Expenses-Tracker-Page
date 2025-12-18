import { Transaction } from "../transactions/type";
import { ECategoryType } from "./enum";

export type Category = {
  id?: string;
  name?: string;
  nameEn: string;
  nameVn: string;
  type: ECategoryType;
  isDelete?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  transaction?: Transaction[];
};

export type CategoryReqBody = Pick<Category, "nameEn" | "nameVn" | "type">;
