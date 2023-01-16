import { Category } from './Category';
import { Image } from './Image';
import { Productor } from './Productor';

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  productor: Productor;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
};
