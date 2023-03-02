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
        else if (localStorage.getItem('user')){
          this.menuType='user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          console.log('User',this.userName);
        }
        else {
          // console.log('Outside')
          this.menuType='default'
        }
      }
    })
  };
  
  logOut(){
    // if(localStorage.getItem('seller')){
      localStorage.removeItem('seller');
      this.route.navigate(['/']);
    };
    userlogOut() {
      localStorage.removeItem('user');
      this.menuType='default';
    };
  // };

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
