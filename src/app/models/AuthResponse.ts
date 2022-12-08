import { User } from './User';

export type AuthResponse = {
  access_token: string;
  user: User;
};
