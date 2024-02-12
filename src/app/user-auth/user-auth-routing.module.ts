import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthComponent } from './user-auth.component';

const routes:Routes=[
  {
    path:'',component:UserAuthComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserAuthRoutingModule { }
