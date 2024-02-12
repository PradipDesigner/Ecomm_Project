import { Component } from '@angular/core';
import { FormBuilder, FormControl , Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { SignUp } from '../data-type';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLoginForm= true;
  signupmsgtext = "";
  ErrorMsg:string = ""

  constructor(private formbuilder:FormBuilder, private userService:UserService){}

  signUpForm = this.formbuilder.group({
    username:['',Validators.required],
    email:['', Validators.required],
    password:['', Validators.required]
  })  

  signInForm = this.formbuilder.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  getSignUpdata(){
    let signup = this.signUpForm.value
    this.userService.signUpdata(signup)
    // console.warn(signup)

    this.userService.signUpMsg.subscribe((SignUpsuccess)=>{
      if(SignUpsuccess){
        this.signupmsgtext = "Signup Successfully please Login now"
      }
      setTimeout(() => {
        this.signupmsgtext = ""
      }, 3000);
    })
  }

  getLogUpdata(){
    let signIn = this.signInForm.value
    this.userService.signInUser(signIn)


    this.userService.loginError.subscribe((error)=>{
      if(error){
        this.ErrorMsg = "Username and Password is invalid, Please try Again"
      }
      setTimeout(() => {
        this.ErrorMsg = ""
      }, 3000);
    })
  }

  showSignUp(){
    this.showLoginForm = false
  }
  showLogin(){
    this.showLoginForm = true
  }


  ngOnInit(){
    this.userService.userReload();
  }
} 
