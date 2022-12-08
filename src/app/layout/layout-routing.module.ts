import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'productor-map',
        loadChildren: () =>
          import('./productor-map/productor-map.module').then(
            (m) => m.ProductorMapPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'productor-map',
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
