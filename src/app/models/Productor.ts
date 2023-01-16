import { Image } from './Image';
import { Product } from './Product';
import { Review } from './Review';

export type Productor = {
  _id: string;
  username: string;
  images: Image[];
  location: {
    type: string;
    coordinates: number[];
  };

  products: Product[];
  reviews: Review[];
};
