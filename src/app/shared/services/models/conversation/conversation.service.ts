import { Injectable } from '@angular/core';
import {
  Conversation,
  ConversationCreating,
} from 'src/app/models/Conversation';
import { HttpService } from '../../http/http.service';
import { Message } from 'src/app/models/Message';
import { Productor } from 'src/app/models/Productor';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpService) {}

  conversations: Conversation[] = [];

  async getAll({ forceFetchio = false } = {}) {
    if (this.conversations.length && !forceFetchio) {
      return this.conversations;
    }
    const conversations = await this.http.get('conversations');
    this.conversations = conversations;
    return conversations;
  }

  async get(id: number, { forceFetchio = false } = {}) {
    let conversation: Conversation | undefined = this.conversations.find(
      (conversation) => conversation._id === id
    );

    if (conversation && !forceFetchio) {
      return conversation;
    }

    conversation = await this.http.get(`conversations/${id}`);
    return conversation;
  }

  async create(conversation: ConversationCreating) {
    const newConversation = await this.http.post('conversations', conversation);
    this.conversations.push(newConversation);
    return newConversation;
  }

  async update(conversation: Conversation) {
    const updatedConversation = await this.http.put(
      `conversations/${conversation._id}`,
      conversation
    );

    this.conversations = this.conversations.map((conversation) =>
      conversation._id === updatedConversation.id
        ? updatedConversation
        : conversation
    );

    return updatedConversation;
  }

  async delete(id: number) {
    await this.http.delete(`conversations/${id}`);
    this.conversations = this.conversations.filter(
      (conversation) => conversation._id !== id
    );
  }

  async getAllMessages(id: number): Promise<any> {
    const messages = await this.http.get(`conversations/${id}/messages`);
    return messages.data;
  }

  async sendMessage(conversation: Conversation, message: string) {
    const newMessage = await this.http.post(
      `conversations/${conversation._id}/messages`,
      { content: message }
    );

    return newMessage as Message;
  }

  async initialize(productorID: string): Promise<Conversation | undefined> {
    console.log('initialize', productorID);
    const creatingConversation: ConversationCreating = {
      name: '',
      users: [productorID],
    };
    const conv = await this.create(creatingConversation);
    return conv;
  }
}
