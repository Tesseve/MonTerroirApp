import { Message } from './Message';
import { User } from './User';

export type Conversation = {
  _id: number;
  name: string;
  users: User[];
};
