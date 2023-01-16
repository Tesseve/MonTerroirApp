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
        path: 'productors',
        loadChildren: () =>
          import('../pages/productors/productors.module').then(
            (m) => m.ProductorsPageModule
          ),
      },
      {
        path: 'my-products',
        loadChildren: () =>
          import('../pages/my-products/my-products.module').then(
            (m) => m.MyProductsPageModule
          ),
      },
      {
        path: 'my-reviews',
        loadChildren: () =>
          import('../pages/my-reviews/my-reviews.module').then(
            (m) => m.MyReviewsPageModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../pages/products/products.module').then(
            (m) => m.ProductsPageModule
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
