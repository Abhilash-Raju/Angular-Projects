import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Price } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: Cart[] | undefined;
  priceSummary : Price={
    price : 0,
    discount: 0,
    tax: 0,
    delivery:0,
    total : 0
  }
  constructor(private productService:ProductsService,private route:Router) { }

  ngOnInit(): void {
    this.loadDetails()

    this.route.events.subscribe((val:any)=>{
      
      if(val.url){
         if (localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.productService.getCartList(userData.id);
        }
      }
    })
  }

  removefromCart(id:number | undefined){
    if(localStorage.getItem('user')){
      id && this.cartData && this.productService.removefromCartAPI(id)
      .subscribe((res)=>{
        if(res){
          this.loadDetails();
        }
      })
    }
  }


  loadDetails(){
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      // console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.productPrice * +item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

    if(!this.cartData.length){
      this.route.navigate(['/'])
    }
    })
  }

  checkout() {
    this.route.navigate(['/checkout'])
  }

}
