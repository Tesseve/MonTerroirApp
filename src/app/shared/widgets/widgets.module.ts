import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { ButtonLoginComponent } from './button-login/button-login.component';


@NgModule({
  declarations: [
    FormInputTextComponent,
    ButtonLoginComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormInputTextComponent,
    ButtonLoginComponent,
  ]
})
export class WidgetsModule { }
