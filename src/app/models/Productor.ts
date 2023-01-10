import { Image } from './Image';

export type Productor = {
  id: number;
  username: string;
  images: Image[];
  location: {
    type: string;
    coordinates: number[];
  };
};
