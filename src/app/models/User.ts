import { Product } from './Product';

export type User = {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  products: Product[] | undefined;
};
