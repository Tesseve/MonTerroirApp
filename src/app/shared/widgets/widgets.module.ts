import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { CardProductComponent } from './card-product/card-product.component';
import { AppBarComponent } from './app-bar/app-bar.component';

@NgModule({
  declarations: [FormInputTextComponent, CardProductComponent, AppBarComponent],
  imports: [CommonModule],
  exports: [FormInputTextComponent, CardProductComponent, AppBarComponent],
})
export class WidgetsModule {}
