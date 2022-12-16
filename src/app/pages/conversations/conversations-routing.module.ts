import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationsPage } from './conversations.page';

const routes: Routes = [
  {
    path: '',
    component: ConversationsPage,
    children: [
      {
        path: ':id',
        loadChildren: () =>
          import('./conversation/conversation.module').then(
            (m) => m.ConversationPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationsPageRoutingModule {}
