import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  signUpMsg = new EventEmitter<boolean>(false);
  loginError = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  signUpdata(data:any){
     this.http.post('http://localhost:3000/user',data,{observe:'response'}).subscribe((result)=>{
      console.log(result)
      // localStorage.setItem('user', JSON.stringify(result.body));
      if(result){
        this.signUpMsg.emit(true)
      }
    })
  }

  signInUser(data:any){
     this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{

      if(result && result.body && result.body.length)
      {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])
        this.loginError.emit(false)
      }
      else{
        this.loginError.emit(true)
      }
     })
  }
  
  userReload(){
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/'])
    }
  }
}
