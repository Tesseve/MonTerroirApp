import { Category } from './Category';
import { Image } from './Image';
import { Productor } from './Productor';
import { Review } from './Review';

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  productor: Productor;
  categories: Category[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
};
