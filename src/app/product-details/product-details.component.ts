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
  limitMsg: string = '';
  removecartdata = false;
  cartDataAfteruserLogin: product | undefined;
  Message: string | undefined = ""

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
    if (productId && cartData) {
      let items = JSON.parse(cartData);

      items = items.filter((result: product) => productId == result.id.toString())
      if (items.length) {
        this.removecartdata = true
      }
      else {
        this.removecartdata = false
      }
    }

    let user = localStorage.getItem('user');
    if (user) {
      let userData = user ? JSON.parse(user) : '';
      let userId = userData[0].id;

      console.log(userId)
      this.productService.getCartList(userId)
      this.productService.Cartdatastore.subscribe((result) => {
        let item = result.filter((item: product) => productId?.toString() === item.productId)
        console.log(item)
        if (item.length) {
          this.cartDataAfteruserLogin = item[0]
          this.removecartdata = true
        }
      })
    }
  }




  handelQuantity(val: any) {
    if (this.Quantity < 10 && val === 'plus') {
      // this.Quantity = this.Quantity+1
      this.Quantity += 1
      if (this.Quantity == 10) {
        this.limitMsg = "you can order only Ten(10) products"
      }
      setTimeout(() => {
        this.limitMsg = ""
      }, 5000);

    }
    else if (this.Quantity > 1 && val === 'minus') {
      // this.Quantity = this.Quantity-1
      this.Quantity -= 1
      this.limitMsg = ""
    }
  }

  Addcart() {
    if (this.productData) {
      this.productData.quantity = this.Quantity
      // console.log(this.productData)

      if (!localStorage.getItem('user')) {
        // console.log(this.productData)
        this.productService.localCartData(this.productData)
        this.removecartdata = true;
      }
      else {
        console.log('user log in');
        // debugger
        let user = localStorage.getItem('user');
        let userData = user ? JSON.parse(user) : ''
        let userId = userData[0].id;
        // console.log(userId);

        let cartData = {
          ...this.productData, userId,
          productId: this.productData.id
        }
        delete cartData.id
        // console.log(cartData)

        this.productService.addTocart(cartData).subscribe((result) => {
          // console.log(result)
          if (result) {
            this.productService.getCartList(userId);
            this.Message = "This product Added in cart"

            setTimeout(() => {
              this.Message = undefined
            }, 5000);
          }
        })
      }
    }
  }
  removeCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeToCart(productId)
      this.removecartdata = false;
    }
    else {

      console.log(this.cartDataAfteruserLogin)

      let user = localStorage.getItem('user')
      let userData = user ? JSON.parse(user) : ''
      let userId = userData[0].id
      this.cartDataAfteruserLogin && this.productService.removeTocartAfterUserLogin(this.cartDataAfteruserLogin.id).subscribe((result) => {
        if (result) {
          this.productService.getCartList(userId)
          this.removecartdata = false;
        }
      })
    }

  }

}
