import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : undefined | Products;
  productQuantity: number =1;
  constructor(private activated:ActivatedRoute, private productService:ProductsService) { }

  ngOnInit(): void {
    let productId = this.activated.snapshot.paramMap.get('productId');
    // console.log('Product',productId);
    productId && this.productService.getProduct(productId).subscribe((res)=>{
      this.product = res;
      // console.log(res)
    })
  }

  handle(val:string){
      this.productQuantity < 20 && val ==='plus' ? this.productQuantity +=1 : this.productQuantity >1 && val ==='min' ? this.productQuantity -=1 : this.productQuantity; 
  }
}
