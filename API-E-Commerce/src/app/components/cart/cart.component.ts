import { Component, OnInit } from '@angular/core';
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
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((res)=>{
      this.cartData = res;
      let sum = 0;
      res.forEach((item)=>{
        if(item.quantity){
          sum = sum +(+item.productPrice* +item.quantity);
        }
      })
      this.priceSummary.price = sum;
      this.priceSummary.discount = sum/10;
      this.priceSummary.tax=sum/10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = sum + sum/10 + 100 - sum/10;
    })
  }

}
