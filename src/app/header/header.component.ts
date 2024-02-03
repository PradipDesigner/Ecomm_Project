import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router){}

  menuType:string ='default';
  sellerName:string = '';
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
        else{
          this.menuType = 'default'
        }
      }
    })
  }

  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }
}
