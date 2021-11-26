import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'update-recept/:id',
    loadChildren: () => import('./pages/update-recept/update-recept.module').then(m => m.UpdateReceptPageModule)
  },
  {
    path: 'detailpage/:id',
    loadChildren: () => import('./pages/detailpage/detailpage.module').then( m => m.DetailpagePageModule)
  },
  {
    path: 'detailpage',
    loadChildren: () => import('./pages/detailpage/detailpage.module').then( m => m.DetailpagePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'createuser',
    loadChildren: () => import('./pages/createuser/createuser.module').then( m => m.CreateuserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
