export type Productor = {
  id: number;
  username: string;
  location: {
    type: string;
    coordinates: number[];
  };
};
