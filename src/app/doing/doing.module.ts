import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoingPageRoutingModule } from './doing-routing.module';

import { DoingPage } from './doing.page';

@NgModule({
  imports: [
    CommonModule,
    DoingPage,
    FormsModule,
    IonicModule,
    DoingPageRoutingModule
  ]
  //declarations: [DoingPage]
})
export class DoingPageModule {}
