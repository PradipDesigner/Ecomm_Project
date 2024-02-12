import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }


  SellerSignUp(data:SignUp){
    // console.log("service called")

    this.http.post('http://localhost:3000/seller',data, {observe: 'response'}).subscribe((result)=>{
      // console.log(result)
      // this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(['seller-dashboard']);
    })
    
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      // this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-dashboard']);
    }
  }

  sellerLogin(data:Login){
    // console.log(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result:any)=>{
      // console.log(result)
      if(result && result.body && result.body.length){
        // console.log("user loged in")
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['/seller-dashboard'])
      }
      else{
        // console.log("login failed")
        this.isLoginError.emit(true)
      }
    })
  }
}
