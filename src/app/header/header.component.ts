import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router, private productService:ProductService){}

  menuType:string ='default';
  sellerName:string = '';
  username:string='';
  cartItem=0;




  ngOnInit(): void{
    this.router.events.subscribe((val:any)=>{
      // console.log(val.url)
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log("in seller area")
          this.menuType = 'seller'

          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerdata = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerdata.name
          }
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userdata = userStore && JSON.parse(userStore)[0]
          this.username = userdata.username
          this.menuType = 'user';
          this.productService.getCartList(userdata.id)
        }
        else{
          this.menuType = 'default'
        }
      }
    })

    let cartCount = localStorage.getItem('localCart');
    if(cartCount){
      this.cartItem = JSON.parse(cartCount).length
    }
    this.productService.Cartdatastore.subscribe((result)=>{
      this.cartItem = result.length
    })

  }

  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }
  userlogOut(){
    localStorage.removeItem('user');
    this.router.navigate(['user-auth'])
    // this.productService.Cartdatastore.emit([])
  }

  search(data:any){
    if(data){
      let element = data.target as HTMLInputElement
      // console.warn(element.value)
      this.productService.searchProduct(element.value).subscribe((result)=>{
        console.log(result)
      })  
    }
    // this.productService.searchProduct(data).subscribe((data: product[]) => {
    //   console.log("final data --->", data);
    //   console.log("Number of products: ", data.length);
    //   // Do something with the data here
    // });
  }
}
