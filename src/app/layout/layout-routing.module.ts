import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'favoris',
        loadChildren: () =>
          import('../pages/favoris/favoris.module').then(
            (m) => m.FavorisPageModule
          ),
      },
      {
        path: 'explore',
        loadChildren: () =>
          import('../pages/explore/explore.module').then(
            (m) => m.ExplorePageModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'conversations',
        loadChildren: () =>
          import('../pages/conversations/conversations.module').then(
            (m) => m.ConversationsPageModule
          ),
      },
      {
        path: 'conversations/:id',
        loadChildren: () =>
          import(
            '../pages/conversations/conversation/conversation.module'
          ).then((m) => m.ConversationPageModule),
      },

      {
        path: 'profil',
        loadChildren: () =>
          import('../pages/profil/profil.module').then(
            (m) => m.ProfilPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
