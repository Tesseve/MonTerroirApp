import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conversation } from 'src/app/models/Conversation';
import { Message } from 'src/app/models/Message';
import { ConversationService } from 'src/app/shared/services/models/conversation/conversation.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  conversation?: Conversation;
  isVisible = true;

  messages: Message[] = [];

  websocketSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private router: Router,
    private websocketService: WebsocketService,
    private render: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
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
    this.messages = await this.conversationService.getAllMessages(
      conversation!._id
    );
    this.messages = this.messages;
    console.log('messages', this.messages);
  }

  ngOnInit() {
    this.init();
    this.websocketSubscription = this.websocketService.newMessage$.subscribe(
      (message) => {
        console.log('new message WEBSOCKET', message);
        this.insertMessage(message);
      }
    );
  }

  ngOnDestroy() {
    this.websocketSubscription?.unsubscribe();
  }

  goBack() {
    this.router.navigate(['conversations']);
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

  async send(event: Event) {
    if (!this.conversation) return;
    const target = event.target as HTMLInputElement;
    const message = target.value;
    console.log(message);

    const newMessage = await this.conversationService.sendMessage(
      this.conversation,
      message
    );
    console.log(newMessage);
    if (newMessage) {
      this.insertMessage(newMessage);
      target.value = '';
    }
  }

  public rerender(): void {
    //to force the table to rerender
    this.isVisible = false;
    this.changeDetectorRef.detectChanges();
    this.isVisible = true;
  }

  private insertMessage(message: Message) {
    this.messages.unshift(message);
    this.rerender();
  }
}
