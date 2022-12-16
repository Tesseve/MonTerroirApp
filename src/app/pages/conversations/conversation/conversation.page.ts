import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from 'src/app/models/Conversation';
import { ConversationService } from 'src/app/shared/services/models/conversation/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  conversation?: Conversation;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private router: Router
  ) {}

  async init() {
    const id = await this.route.snapshot.params['id'];
    console.log(id);
    const conversation = await this.conversationService.get(id);
    console.log(conversation);

    if (!conversation) {
      this.router.navigate(['conversations']);
    }

    this.conversation = conversation;
  }

  ngOnInit() {
    this.init();
  }
}
