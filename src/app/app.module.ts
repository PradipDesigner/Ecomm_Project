import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MycartComponent } from './mycart/mycart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SellerDashboardComponent,
    SellerUpdateProductComponent,
    PageNotFoundComponent,
    MycartComponent,
    CheckoutComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
