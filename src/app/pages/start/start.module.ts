import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartPageRoutingModule } from './start-routing.module';

import { StartPage } from './start.page';

import { WidgetsModule } from 'src/app/shared/widgets/widgets.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    WidgetsModule,
  ],
  declarations: [StartPage]
})
export class StartPageModule { }
