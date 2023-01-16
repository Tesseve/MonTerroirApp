import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationsPageRoutingModule } from './conversations-routing.module';

import { ConversationsPage } from './conversations.page';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';
import { ConversationNamePipe } from 'src/app/pipes/conversation-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversationsPageRoutingModule,
    WidgetsModule,
    ConversationNamePipe,
  ],
  declarations: [ConversationsPage],
})
export class ConversationsPageModule {}
