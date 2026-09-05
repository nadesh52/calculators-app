import { Order } from "./order";

export type People = {
  id: number;
  name: string;
  order?: Order[];
  total?: number;
};
