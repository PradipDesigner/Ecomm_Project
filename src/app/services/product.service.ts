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

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/Products/${id}`)
  }

  updateproduct(product:product){
    return this.http.put(`http://localhost:3000/Products/${product.id}`,product)
  }

  popularProduct(){
    return this.http.get<product[]>(`http://localhost:3000/Products?_limit=4`)
  }

}
