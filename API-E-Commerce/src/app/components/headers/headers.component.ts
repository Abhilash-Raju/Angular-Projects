import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  constructor(private route:Router) { }
  menuType:string = 'default';
  sellerName:string=''
  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      
      if(val.url){
        // console.log(val.url)
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.warn('In seller area');
          this.menuType='seller';
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }
        else {
          // console.log('Outside')
          this.menuType='default'
        }
      }
    })
  }

  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['seller-auth'])
  }

}
