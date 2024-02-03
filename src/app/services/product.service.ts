import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  // product add service

  addproduct(data:product){
    // console.log(data)
    return this.http.post('http://localhost:3000/Products',data)
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/Products')
  }

  ProductDeleteService(id:any){
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }

}
