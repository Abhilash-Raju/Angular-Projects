import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData :Order[] | undefined;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
    if(orderId){
      this.productService.deleteOrder(orderId).subscribe((res)=>{
        this.getOrderList()
      })
    }
  }

  getOrderList(){
    this.productService.orderList().subscribe((res)=>{
      this.orderData = res;
  })
  }
}
