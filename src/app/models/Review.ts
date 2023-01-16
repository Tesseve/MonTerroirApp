import { User } from './User';

export type Review = {
  _id: string;
  score: number;
  message: string;
  author: User;
};
