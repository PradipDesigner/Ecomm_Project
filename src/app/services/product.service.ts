import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { order, product } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Cartdatastore= new EventEmitter<product[]>();

  constructor(private http: HttpClient) { }


  // product add service

  addproduct(data: product) {
    // console.log(data)
    return this.http.post('http://localhost:3000/Products', data)
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/Products')
  }

  ProductDeleteService(id: any) {
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/Products/${id}`)
  }

  updateproduct(product: product) {
    return this.http.put(`http://localhost:3000/Products/${product.id}`, product)
  }

  popularProduct() {
    return this.http.get<product[]>(`http://localhost:3000/Products?_limit=4`)
  }
  trendyProduct() {
    return this.http.get<product[]>(`http://localhost:3000/Products?_limit=12`)
  }
  searchProduct(query: string) {
    return this.http.get<any>(`http://localhost:3000/Products?category=watch`);
  }
  localCartData(data: product) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.Cartdatastore.emit([data])
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.Cartdatastore.emit(cartData)
  }

  removeToCart(productId:number){
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      let items:product[] = JSON.parse(cartData)
      items = items.filter((result:product)=> productId !== result.id)
      console.log(items)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.Cartdatastore.emit(items)

    }
  }
  datastoreincart(){
    let datalocalCart = localStorage.getItem('localCart')
    if(datalocalCart){
      
    }
  }

  addTocart(cartdata:any){
    return this.http.post('http://localhost:3000/cart', cartdata)
  }

  getCartList(userId:string){
    this.http.get<product[]>('http://localhost:3000/cart?userId='+userId, {observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        // console.log(result.body)
        this.Cartdatastore.emit(result.body)
      }
      
    })
  }
  removeTocartAfterUserLogin(cartId:string){
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  CurrentCart(){
    let user = localStorage.getItem('user')
    let userData = user ? JSON.parse(user) : ''
    let userId = userData[0].id
    return this.http.get('http://localhost:3000/cart?userId='+userId)
  }

  myOrder(data:any){
    return this.http.post('http://localhost:3000/orders',data)
  }

  orderList(){
    let user = localStorage.getItem('user')
    let userData = user ? JSON.parse(user) : ''
    let userId = userData[0].id
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userId)
  }


  removeCartitemsAfterOrderPlaced(cartId:string){
    this.http.delete('http://localhost:3000/cart/'+cartId, {observe:'response'}).subscribe((result)=>{
      if(result){
        this.Cartdatastore.emit([])
      }
    })
  }
  Ordercancel(orderId:string| undefined){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}
