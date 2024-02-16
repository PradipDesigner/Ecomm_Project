import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart } from '../data-type';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  TotalPayable = 0;
  orderSuccessMsg: string | undefined = "";
  cartData:any|undefined;

  constructor(private formbuilder: FormBuilder, private productservice: ProductService, private router:Router) { }




  ngOnInit() {
    this.productservice.CurrentCart().subscribe((result) => {
      if (result) {
        let price = 0;
        this.cartData = result;


        Object.values(result).forEach((item) => {
          price = price + (+ item.price) * item.quantity
        });
        this.TotalPayable = price + (- price / 10) + 100 + (price / 10)
      }
    })
  }



  orderForm = this.formbuilder.group({
    name: ['', Validators.required],
    mobileNumber: ['', [Validators.required]],
    address: ['', Validators.required]
  })



  orderSubmit() {
    let formdata = this.orderForm.value
    let user = localStorage.getItem('user');
    let userData = user ? JSON.parse(user) : '';
    let userId = userData[0].id
    if (this.TotalPayable) {
      let orderData = {
        ...formdata,
        userId,
        TotalPayable: this.TotalPayable
      }
      this.productservice.myOrder(orderData).subscribe((result) => {

       setTimeout(() => {
        this.cartData.forEach((item:any)=>{
          this.productservice.removeCartitemsAfterOrderPlaced(item.id)
        })
       }, 800);

        if (result) {
          this.orderSuccessMsg = "Your Order Placed Successfully";

          setTimeout(() => {
            this.router.navigate(['/MyOrder'])
            this.orderSuccessMsg = undefined
          }, 3000);

          
        }
      })
    }

  }
}
