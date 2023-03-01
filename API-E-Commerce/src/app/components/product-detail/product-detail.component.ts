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
  constructor(private activated:ActivatedRoute, private productService:ProductsService) { }

  ngOnInit(): void {
    let productId = this.activated.snapshot.paramMap.get('productId');
    console.log('Product',productId);
    productId && this.productService.getProduct(productId).subscribe((res)=>{
      this.product = res;
      console.log(res)
    })
  }

}
