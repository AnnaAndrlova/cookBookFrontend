import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CreateuserPageRoutingModule } from './createuser-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateuserPage } from './createuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateuserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateuserPage]
})
export class CreateuserPageModule {}
