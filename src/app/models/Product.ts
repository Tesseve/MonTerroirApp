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
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
};
