import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SellerAddProductComponent } from './seller-add-product.component';


const routes : Routes =[
  {
    path:'',component:SellerAddProductComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SelleraddProductRoutingModule { }
