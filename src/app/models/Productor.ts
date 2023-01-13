import { Image } from './Image';

export type Productor = {
  _id: string;
  username: string;
  images: Image[];
  location: {
    type: string;
    coordinates: number[];
  };
};
