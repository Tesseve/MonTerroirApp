export type AuthRegisterRequest = {
  username: string;
  password: string;
  role: string;
  location: {
    type: string;
    coordinates: number[];
  };
  images: string[];
};
