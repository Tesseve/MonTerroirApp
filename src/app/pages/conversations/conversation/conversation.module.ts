import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationPageRoutingModule } from './conversation-routing.module';

import { ConversationPage } from './conversation.page';
import { ConversationNamePipe } from 'src/app/pipes/conversation-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationPageRoutingModule,
    ConversationNamePipe,
  ],
  declarations: [ConversationPage],
})
export class ConversationPageModule {}
