import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productdata: undefined | product[]

  trendyProducts: undefined |product[]

  constructor(private productservice:ProductService){}

  ngOnInit(){
    this.productservice.popularProduct().subscribe((result)=>{
      this.productdata = result
    })

    this.productservice.trendyProduct().subscribe((result)=>{
      this.trendyProducts = result
    })
  }
  activeItemIndex: number = 0;

  // Method to change the active item
  setActiveItem(index: number) {
    this.activeItemIndex = index;
  }

}
