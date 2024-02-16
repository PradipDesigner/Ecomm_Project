import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SignUp, cart, product } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLoginForm = true;
  signupmsgtext = "";
  ErrorMsg: string = ""

  constructor(private formbuilder: FormBuilder, private userService: UserService, private productService: ProductService) { }

  signUpForm = this.formbuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  signInForm = this.formbuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  getSignUpdata() {
    let signup = this.signUpForm.value
    this.userService.signUpdata(signup)
    // console.warn(signup)

    this.userService.signUpMsg.subscribe((SignUpsuccess) => {
      if (SignUpsuccess) {
        this.signupmsgtext = "Signup Successfully please Login now"
      }
      setTimeout(() => {
        this.signupmsgtext = ""
      }, 3000);
    })
  }

  getLogIndata() {
    let signIn = this.signInForm.value
    this.userService.signInUser(signIn)


    this.userService.loginError.subscribe((error) => {
      if (error) {
        this.ErrorMsg = "Username and Password is invalid, Please try Again"
        // setTimeout(() => {
        //   this.ErrorMsg = ""
        // }, 3000);
      }
      else {
        console.log("user logged in")
        this.localCartToremoteCart()
      }
    })
  }

  showSignUp() {
    this.showLoginForm = false
  }
  showLogin() {
    this.showLoginForm = true
  }


  ngOnInit() {
    this.userService.userReload();
  }

  localCartToremoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userData = user ? JSON.parse(user) : ''
    let userId = userData[0].id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data); //OR ==>  let cartDataList:product[] = JSON.parse(data || '[]');

      cartDataList.forEach((result: product, index: any) => {
        let cartData: cart = {
          ...result,
          productId: result.id,
          userId
        }
        delete cartData.id

        setTimeout(() => {
          this.productService.addTocart(cartData).subscribe((item) => {
            if (item) {
              console.log("data store in db file")
            }
          })
        }, 700);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      });
    }

    setTimeout(() => {
      this.productService.getCartList(userId)
    }, 900);
  }
} 
