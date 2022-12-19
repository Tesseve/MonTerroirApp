import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from 'src/app/models/Conversation';
import { Message } from 'src/app/models/Message';
import { ConversationService } from 'src/app/shared/services/models/conversation/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  conversation?: Conversation;

  messages: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private router: Router
  ) {
    this.conversation = undefined;
  }

  async init() {
    const id = await this.route.snapshot.params['id'];
    console.log(id);
    const conversation = await this.conversationService.get(id);
    console.log(conversation);

    if (!conversation) {
      this.router.navigate(['conversations']);
    }

    this.conversation = conversation;
    this.messages = await this.conversationService.getAllMessages(conversation!._id);
    console.log('messages',this.messages);
  }

  ngOnInit() {
    this.init();
  }

  // // create conversation 
  // async create() {
  //   const conversation = await this.conversationService.create({
  //     name: 'test',
  //     description: 'test',
  //     messages: [],
  //   });

  //   this.router.navigate(['conversations', conversation._id]);
  // }

  // async delete() {
  //   if (this.conversation) {
  //     await this.conversationService.delete(this.conversation._id);
  //     this.router.navigate(['conversations']);
  //   }
  // }

  // async update() {
  //   if (this.conversation) {
  //     await this.conversationService.update(this.conversation);
  //     this.init();
  //   }
  // }

  // async addMessage() {
  //   if (this.conversation) {
  //     await this.conversationService.addMessage(this.conversation._id, 'test');

  //     this.init();
  //   }
  // }

}
