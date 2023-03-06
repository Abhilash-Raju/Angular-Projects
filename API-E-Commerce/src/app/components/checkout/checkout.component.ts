import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Order } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductsService, private route:Router) { }

  priceSummary : number | undefined; 
  cartData : Cart[] | undefined;
  message: string | undefined;
  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;  
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.productPrice * +item.quantity)
        }
      })
      this.priceSummary = price + (price / 10) + 100 - (price / 10);

  })
  }

  checkOut(data:{email:string,address:string,phone:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.priceSummary){
      let orderData:Order = {
          ...data,
          priceSummary:this.priceSummary,
          userId,
          id:undefined
      }
    this.cartData?.forEach((item)=>{
      setTimeout(()=>{
        item.id && this.productService.deleteCartItems(item.id)
      },700)
    })

    this.productService.order(orderData).subscribe((res)=>{
      if(res){
        this.message = 'Your order has been placed'
        setTimeout(()=>{
          this.route.navigate(['/my-orders']);
          this.message=undefined;
        },4000)
      }
    })
    }
  }
}
