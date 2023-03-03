import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  constructor(private route:Router, private productService: ProductsService) { }
  menuType:string = 'default';
  sellerName:string='';
  userName : string ='';
  searchResult : undefined | Products[];
  num : number =0;
  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType='seller';
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }
        else if (localStorage.getItem('user')){
          this.menuType='user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.productService.getCartList(userData.id);
        }
        else {
          this.menuType='default'
        }
      }
    })

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.num=JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items)=>{
      this.num=items.length;
    })
  };
  
  logOut(){
      localStorage.removeItem('seller');
      this.route.navigate(['/']);
    };
    userlogOut() {
      localStorage.removeItem('user');
      this.menuType='default';
      this.route.navigate(['/']);
      this.productService.cartData.emit([]);
    };

  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      
    this.productService.searchProduct(element.value).subscribe((res)=>{
      if(res.length >5){
        res.length=4;
      }
      this.searchResult = res;
    })
    }
  };

  hideSearch(){
    this.searchResult = undefined;
  };

  redirect(id:number){
    this.route.navigate(['/details/' +id]);
    setTimeout(()=>{
      window.location.reload();
    },500);
  }

  searchSubmit(val:string){
    console.log('Header',val);
    this.route.navigate([`search/${val}`]);
    setTimeout(()=>{
      window.location.reload();
    },500);
  }
}
