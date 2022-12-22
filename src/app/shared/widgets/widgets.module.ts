import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { ButtonLoginComponent } from './button-login/button-login.component';
import { CardProductComponent } from './card-product/card-product.component';
import { LocalPositionBarComponent } from './local-position-bar/local-position-bar.component';

import { AppBarComponent } from './app-bar/app-bar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    FormInputTextComponent,
    ButtonLoginComponent,
    CardProductComponent,
    LocalPositionBarComponent,
    AppBarComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    FormInputTextComponent,
    ButtonLoginComponent,
    CardProductComponent,
    LocalPositionBarComponent,
    AppBarComponent,
  ],
})
export class WidgetsModule {}
