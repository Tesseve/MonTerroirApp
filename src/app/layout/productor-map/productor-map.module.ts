import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductorMapPageRoutingModule } from './productor-map-routing.module';

import { ProductorMapPage } from './productor-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductorMapPageRoutingModule
  ],
  declarations: [ProductorMapPage]
})
export class ProductorMapPageModule {}
