import { Image } from './Image';
import { Product } from './Product';

export type Productor = {
  _id: string;
  username: string;
  images: Image[];
  location: {
    type: string;
    coordinates: number[];
  };

  products: Product[];
};
