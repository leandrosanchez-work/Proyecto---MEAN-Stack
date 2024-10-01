import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register.component';



const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'register',
        component: UserRegisterComponent
      },
      {
        path: '**',
        redirectTo: 'auth'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
