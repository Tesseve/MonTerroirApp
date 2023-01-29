import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Conversation } from 'src/app/models/Conversation';
import { Productor } from 'src/app/models/Productor';
import { ConversationService } from 'src/app/shared/services/models/conversation/conversation.service';
import { ProductorService } from 'src/app/shared/services/models/productor/productor.service';

@Component({
  selector: 'app-productor',
  templateUrl: './productor.page.html',
  styleUrls: ['./productor.page.scss'],
})
export class ProductorPage implements OnInit {
  productor?: Productor;
  constructor(
    private activeRoute: ActivatedRoute,
    private productorService: ProductorService,
    private conversationService: ConversationService,
    private router: Router
  ) {}

  async init() {
    const id = (await firstValueFrom(this.activeRoute.params))['id'];
    const productor = await this.productorService.get(id);
    this.productor = productor;
    console.log('productor', this.productor);
  }

  ngOnInit() {
    this.init();
  }

  async contact() {
    if (!this.productor) return;
    const conv: Conversation | undefined =
      await this.conversationService.initialize(this.productor._id);

    if (!conv) return;
    await this.router.navigate(['conversations', conv._id]);
  }
}
