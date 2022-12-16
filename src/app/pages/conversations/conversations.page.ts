import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/models/Conversation';
import { ConversationService } from 'src/app/shared/services/models/conversation/conversation.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {
  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.loadConversation(true);
  }

  conversations: Conversation[] = [];

  async loadConversation(forceFetchio?: boolean, event?: any | undefined) {
    const convs = await this.conversationService.getAll({ forceFetchio });

    console.log(convs);
    this.conversations = convs;

    if (event) event.target.complete();
  }
}
