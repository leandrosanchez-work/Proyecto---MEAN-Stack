import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './favoritos/list/list.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosModule)
  },

  {

    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginModule)
  },
  {

    path: 'register',
    loadChildren: () => import('./auth/user-register/user-register-routing.module').then( m => m.RoutingModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
  {
    path: '',
    component: ListComponent, canActivate: [ AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
