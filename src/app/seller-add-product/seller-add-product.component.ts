import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  productMsg: string | undefined
  constructor(private productService: ProductService) { }

  AddProduct(productForm: product) {
    this.productService.addproduct(productForm).subscribe((isAddProduct) => {
      if (isAddProduct) {
        this.productMsg = "Your Product added succesfully ! check now in Product list";
        setTimeout(() => {
          this.productMsg = undefined
        }, 3000);


        
      }
    })
    // productForm.reset()

  }
}
