import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | product;
  Quantity: number = 1;
  limitMsg:string='';
  removecartdata= false;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.productService.getProduct(productId).subscribe((result) => {
      // console.log(result)
      if (result) {
        this.productData = result
      }
    })


    let cartData = localStorage.getItem('localCart')
    if( productId && cartData){
      let items = JSON.parse(cartData);

      items = items.filter((result:product)=> productId == result.id)
      if(items.length){
        this.removecartdata = true
      }
      else{
        this.removecartdata = false
      }
    }
  }
  handelQuantity(val: any) {
    if (this.Quantity < 10 && val === 'plus') {
      // this.Quantity = this.Quantity+1
      this.Quantity+=1
      if(this.Quantity == 10){
        this.limitMsg = "you can order only Ten(10) products"
      }
      setTimeout(() => {
        this.limitMsg = ""
      }, 5000);
      
    }
    else if(this.Quantity > 1 && val === 'minus') {
      // this.Quantity = this.Quantity-1
      this.Quantity-=1
      this.limitMsg = ""
    } 
  }

  Addcart(){
    if(this.productData){
      this.productData.quantity = this.Quantity
      // console.log(this.productData)

      if(!localStorage.getItem('user')){
        // console.log(this.productData)
        this.productService.localCartData(this.productData)
        this.removecartdata = true;
      }
      else{
        console.log('user log in')
      }
    }
  }
  removeCart(productId:number){
    
    this.productService.removeToCart(productId)

    this.removecartdata = false;
  }

}
