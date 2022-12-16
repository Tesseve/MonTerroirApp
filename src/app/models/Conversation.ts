import { Message } from './Message';

export type Conversation = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};
