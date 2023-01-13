import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductorsPage } from './productors.page';

const routes: Routes = [
  {
    path: '',
    component: ProductorsPage,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./productor/productor.module').then((m) => m.ProductorPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductorsPageRoutingModule {}
