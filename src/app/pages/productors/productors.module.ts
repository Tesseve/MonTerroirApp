import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductorsPageRoutingModule } from './productors-routing.module';

import { ProductorsPage } from './productors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductorsPageRoutingModule
  ],
  declarations: [ProductorsPage]
})
export class ProductorsPageModule {}
