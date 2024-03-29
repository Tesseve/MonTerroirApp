import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create-product/create-product.module').then(
        (m) => m.CreateProductPageModule
      ),
  },
  {
    path: ':id/edit',
    loadChildren: () =>
      import('./edit-product/edit-product.module').then(
        (m) => m.EditProductPageModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
