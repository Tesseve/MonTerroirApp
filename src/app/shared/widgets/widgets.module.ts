import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputTextComponent } from './form-input-text/form-input-text.component';
import { ButtonLoginComponent } from './button-login/button-login.component';
import { CardProductComponent } from './card-product/card-product.component';
import { LocalPositionBarComponent } from './local-position-bar/local-position-bar.component';
import { FormSwitchComponent } from './form-switch/form-switch.component';

import { AppBarComponent } from './app-bar/app-bar.component';
import { IonicModule } from '@ionic/angular';
import { CardProductorComponent } from './card-productor/card-productor.component';
import { ReviewItemComponent } from './review-item/review-item.component';
import { FiltreProductComponent } from './filtre-product/filtre-product.component';
import { FormProductComponent } from './forms/form-product/form-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormInputTextComponent,
    ButtonLoginComponent,
    CardProductComponent,
    LocalPositionBarComponent,
    AppBarComponent,
    CardProductorComponent,
    ReviewItemComponent,
    FormSwitchComponent,
    FiltreProductComponent,
    FormProductComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormInputTextComponent,
    ButtonLoginComponent,
    CardProductComponent,
    LocalPositionBarComponent,
    AppBarComponent,
    CardProductorComponent,
    ReviewItemComponent,
    FormSwitchComponent,
    FiltreProductComponent,
    FormProductComponent,
  ],
})
export class WidgetsModule { }
