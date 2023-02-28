import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductsService,private router:Router) { }

  productMessage : undefined | string;
  productData : undefined | Products
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((res)=>{
      // console.log(res);
      this.productData=res
    })
  }

  submit(data:Products){
    if(this.productData){
      data.id = this.productData.id;
      console.log(data.id)
    }
    this.productService.updateProduct(data).subscribe((res)=>{
      if(res){
        this.productMessage ='Product is updated';
        setTimeout(()=>{  
          this.productMessage= undefined;
          this.router.navigate(['seller-home']);
        },2000)
      }
    
    });
  }
}
