import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { AuthGuard } from './Authentication/auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
