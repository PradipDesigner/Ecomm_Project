import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { MyOrderComponent } from './my-order.component';

const routes:Routes=[
  {path:'',component:MyOrderComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class MyOrderModule { }
