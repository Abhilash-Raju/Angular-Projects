import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private productService: ProductsService, private route:Router) { }

  priceSummary : number | undefined; 
  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {

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
          userId
      }
    this.productService.order(orderData).subscribe((res)=>{
      if(res){
        // console.log("Order placed")
        this.route.navigate(['/my-orders']);
      }
    })
    }
  }
}
