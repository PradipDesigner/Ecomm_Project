import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const sellerService = inject(SellerService)
  const router = inject(Router)


  let isSellerLoggedIn = localStorage.getItem('seller')
  if(isSellerLoggedIn){
    return true;
  }
  else{
    return false
  }

};
