import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateReceptPage } from './update-recept.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateReceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateReceptPageRoutingModule {}
