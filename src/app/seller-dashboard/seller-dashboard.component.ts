import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent {
  productList: undefined|product[];
  deleteProductMsg:string|undefined
  constructor(private product:ProductService){}

  

  ngOnInit(){
    // this.product.productList().subscribe((result)=>{
    //   // console.log(result)
    //   this.productList = result
    // })
    this.list();
  }
  deleteProduct(id:any){
    // console.log("product is", id)
    this.product.ProductDeleteService(id).subscribe((result)=>{
      if(result){
        this.deleteProductMsg = "Product delete succesfully";
        this.list();
      }
      setTimeout(() => {
        this.deleteProductMsg = undefined
      }, 3000);
    })
  }


  // list service store
  list(){
    this.product.productList().subscribe((result)=>{
      // console.log(result)
      this.productList = result
    })
  }
}
