import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product : undefined | Products;
  productQuantity: number =1;
  removeCart : boolean = false;
  cartData : undefined| Products;
  constructor(private activated:ActivatedRoute, private productService:ProductsService) { }

  ngOnInit(): void {

    let productId = this.activated.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((res)=>{
      this.product = res;
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData && productId){
      let items = JSON.parse(cartData);
      items = items.filter((item:Products)=> productId == item.id.toString());
      if(items.length){
        this.removeCart = true;
      } else{
        this.removeCart = false;
      }
    }
    
    let user = localStorage.getItem('user');
    if(user){
      let userId = user && JSON.parse(user).id;
      this.productService.getCartList(userId);
      this.productService.cartData.subscribe((res)=>{
       let item = res.filter((item:Products)=>productId?.toString() ===item.productId?.toString());
       if(item.length){
        this.cartData=item[0];
        this.removeCart = true;
       }
      })
    }

  }
  
  handle(val:string){
    this.productQuantity < 20 && val ==='plus' ? this.productQuantity +=1 : this.productQuantity >1 && val ==='min' ? this.productQuantity -=1 : this.productQuantity; 
  }
  
  addToCart(){
    if(this.product){
      this.product.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.productService.localAddtoCart(this.product)
        this.removeCart = true;
    } else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:Cart ={
          ...this.product,
          userId,
          productId:this.product.id
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((res)=>{
          if(res){
            this.productService.getCartList(userId);
            this.removeCart = true;
            alert('Product added to Cart')
          }
        })
      }
    }
  }

  removefromCart(id:number){
    if(!localStorage.getItem('user')){
      this.productService.removeFromCart(id);
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.productService.removefromCartAPI(this.cartData.id)
      .subscribe((res)=>{
        if(res){
          this.productService.getCartList(userId)
        }
      })
    }
    this.removeCart = false;
  }
}
