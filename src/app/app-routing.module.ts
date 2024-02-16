import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AuthGuard } from './Authentication/auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MycartComponent } from './mycart/mycart.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },

  {
    path:'home',loadChildren: () => import('./home/home.module').then(m =>m.HomeModule)
  },
  {
    path:'seller-auth', loadChildren:() => import('./seller-auth/seller-auth.module').then(m =>m.SellerAuthModule)
    // path:'seller-auth',component:SellerAuthComponent
  },
  {
    path:'seller-dashboard',component:SellerDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product',loadChildren:()=> import('./seller-add-product/seller-add-product.module').then(m=>m.SellerAddProductModule),
    canActivate:[AuthGuard]
  },
  {
    path:'seller-update-product/:id',component:SellerUpdateProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'productDetails/:id',loadChildren:() => import('./product-details/product-details.module').then(m=>m.ProductDetailsModule)
  },
  {
    path:'user-auth',loadChildren: ()=> import('./user-auth/user-auth.module').then(m=>m.UserAuthModule)
  },
  {
    path:'myCart',component:MycartComponent
  },
  {
    path:'checkout',loadChildren:()=> import('./checkout/checkout.module').then(m=>m.CheckoutModule)
  },
  {
    path:'MyOrder',loadChildren:()=> import('./my-order/my-order.module').then(m=>m.MyOrderModule),
    // canActivate: [AuthGuard]
  },
  {
    path:'**' , component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
