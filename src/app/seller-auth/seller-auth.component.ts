import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
  providers: [SellerService]
})
export class SellerAuthComponent {
  sellerRagister="seller sign up !!";
  sellerlogin="seller LogIn !!";

  showLogin = false

  logInError:string =''

  constructor(private _sellerservice:SellerService, private router:Router){}

  // for seller signup

  SignUp(data:SignUp){
    this._sellerservice.SellerSignUp(data)
  }

  // for login seller
  Login(data:SignUp){
    // console.log(data)
    this._sellerservice.sellerLogin(data);
    this._sellerservice.isLoginError.subscribe((IsError)=>{
      if(IsError){
        this.logInError = "user name and password is invalid"
      }
    })
  }
  // for login form open
  OpenLogin(){
    this.showLogin = false
  }
  OpenSignup(){
    this.showLogin = true
  }


  ngOnInit(){
    this._sellerservice.reloadSeller()
  }
  
}
