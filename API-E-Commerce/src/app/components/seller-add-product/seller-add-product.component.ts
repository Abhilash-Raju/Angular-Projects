import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  constructor(private productService: ProductsService,private route:Router) { }
  addProductMessager : string|undefined;
  ngOnInit(): void {
  }
  submit(data:Products){
    this.productService.addProduct(data)
    .subscribe((res)=>{
      if(res){
        this.addProductMessager='New Product Added';
        setTimeout(()=>{this.addProductMessager=undefined; this.route.navigate(['seller-home']);}, 4000);
      }
    },
    (err)=>{
      console.error(err);
    }
    )
  }
}
