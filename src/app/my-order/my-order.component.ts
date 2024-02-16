import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  listData:order[] | undefined;
  constructor(private productService:ProductService){}
  ngOnInit(){
    this.orderData()

    
  }


  OrderCancel(orderId:string){
    this.productService.Ordercancel(orderId).subscribe((result)=>{
      this.orderData()
    })
  }


  orderData(){
    this.productService.orderList().subscribe((result)=>{
      if(result){
        this.listData = result
      }
    })
  }
}
