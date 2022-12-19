import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { CardProductComponent } from './card-product/card-product.component';



@NgModule({
  declarations: [
    FormInputTextComponent,
    CardProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormInputTextComponent,
    CardProductComponent
  ]
})
export class WidgetsModule { }
