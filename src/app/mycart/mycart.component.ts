import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, paymentSummary } from '../data-type';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent {
  cartdata:any | undefined;
  paymentSummary:paymentSummary={
    price: 0,
    discount: 0,
    gst: 0,
    delevery: 0,
    total: 0
  }

  constructor(private productService:ProductService){}
  // ngOnInit(){
  //   this.productService.CurrentCart().subscribe((result)=>{
  //     console.log(result)
  //     if(result){
  //       this.cartdata = result

  //       let price = 0
  //     result.foreach((result:any)=>{
  //       price = result.price
  //     })
  //     }
      
  //   })
  // }
  ngOnInit() {
    this.loadDetails()
  }

  removeToCart(cartId:string){
    let user = localStorage.getItem('user')
      let userData = user ? JSON.parse(user) : ''
      let userId = userData[0].id
      this.productService.removeTocartAfterUserLogin(cartId).subscribe((result) => {
        if (result) {
          this.productService.getCartList(userId)
          this.loadDetails()
        }
      })
  }
  

  loadDetails(){
    this.productService.CurrentCart().subscribe((result) => {
      if (result) {
        this.cartdata = result;
        let price = 0;
  
        Object.values(result).forEach((item: any) => {
          // Assuming each item has a 'price' property
          price = price + (+ item.price)* item.quantity;
          console.log(price)
        });
        this.paymentSummary.price = price;
        this.paymentSummary.discount = price/10;
        this.paymentSummary.gst = price/10;
        this.paymentSummary.delevery = 100;
        this.paymentSummary.total = price + (- price/10)+ 100 + (price/10)
        
        // console.log(this.paymentSummary.total)
        // Now 'price' should contain the total price of all items
      }
    });
  }
}
