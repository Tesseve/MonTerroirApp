import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductorMapPage } from './productor-map.page';

const routes: Routes = [
  {
    path: '',
    component: ProductorMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductorMapPageRoutingModule {}
