import { Injectable } from '@angular/core';
import { Conversation } from 'src/app/models/Conversation';
import { HttpService } from '../../http/http.service';

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

  async create(conversation: Conversation) {
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
}
