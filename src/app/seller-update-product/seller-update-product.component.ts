import { Component } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:undefined|product;
  productUpdateMsg: string | undefined
  constructor(private route:ActivatedRoute , private productService:ProductService){}

  ngOnInit(){
    let productId = this.route.snapshot.paramMap.get('id')
    // console.log(productId)

    productId && this.productService.getProduct(productId).subscribe((result)=>{
      // console.log(result)
      this.productData = result
    })
  }

  UpdateProduct(data:product){
    if(this.productData){
      data.id = this.productData.id
    }
    this.productService.updateproduct(data).subscribe((result)=>{
      console.log(result)
      if(result){
        this.productUpdateMsg = "Product update succesfully"
      }
      setTimeout(() => {
        this.productUpdateMsg = undefined
      }, 3000);
    })
  }
}
