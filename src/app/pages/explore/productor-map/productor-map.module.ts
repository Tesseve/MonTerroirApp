import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductorMapPageRoutingModule } from './productor-map-routing.module';

import { ProductorMapPage } from './productor-map.page';
import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductorMapPageRoutingModule,
    WidgetsModule,
  ],
  declarations: [ProductorMapPage],
})
export class ProductorMapPageModule {}
