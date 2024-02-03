import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAddProductComponent } from './seller-add-product.component';
import { SelleraddProductRoutingModule } from './selleradd-product-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SellerAddProductComponent
  ],
  imports: [
    CommonModule,
    SelleraddProductRoutingModule,
    FormsModule
  ]
})
export class SellerAddProductModule { }
