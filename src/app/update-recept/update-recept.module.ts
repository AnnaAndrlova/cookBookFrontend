import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateReceptPageRoutingModule } from './update-recept-routing.module';

import { UpdateReceptPage } from './update-recept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateReceptPageRoutingModule
  ],
  declarations: [UpdateReceptPage]
})
export class UpdateReceptPageModule {}
