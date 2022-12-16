import { Category } from './Category';
import { Productor } from './Productor';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  productor: Productor;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
};
