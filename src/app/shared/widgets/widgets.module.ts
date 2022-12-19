import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { ButtonLoginComponent } from './button-login/button-login.component';
import { CardProductComponent } from './card-product/card-product.component';



@NgModule({
  declarations: [
    FormInputTextComponent,
    ButtonLoginComponent,
    CardProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormInputTextComponent,
    ButtonLoginComponent,
    CardProductComponent
  ]
})
export class WidgetsModule { }
