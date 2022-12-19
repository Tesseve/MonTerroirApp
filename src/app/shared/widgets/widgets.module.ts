import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { CardProductComponent } from './card-product/card-product.component';
import { LocalPositionBarComponent } from './local-position-bar/local-position-bar.component';



@NgModule({
  declarations: [
    FormInputTextComponent,
    CardProductComponent,
    LocalPositionBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormInputTextComponent,
    CardProductComponent,
    LocalPositionBarComponent
  ]
})
export class WidgetsModule { }
