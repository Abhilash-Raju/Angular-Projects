import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Products } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cartData = new EventEmitter<Products[] | []>();
  constructor(private http:HttpClient) { }
  addProduct(data:Products){
    console.log('Product Service called');
    return this.http.post('http://localhost:3000/products',data)
  }

  productList(){
    return this.http.get<Products[]>('http://localhost:3000/products')
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id:string){
    return this.http.get<Products>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:Products){
   return this.http.put<Products>(`http://localhost:3000/products/${product.id}`,product);
  }

  popularProducts(){
    return this.http.get<Products[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts(){
    return this.http.get<Products[]>('http://localhost:3000/products?_limit=8');
  }

  searchProduct(query:string){
    return this.http.get<Products[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddtoCart(data:Products){
    let cartData =[];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeFromCart(id:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:Products[] = JSON.parse(cartData);
      items= items.filter((item:Products)=> id!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  
  addToCart(cart:Cart){
    return this.http.post('http://localhost:3000/cart',cart);
  }

  getCartList(userId:number){
    return this.http.get<Products[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'})
            .subscribe((res)=>{
              // console.log('Product Service Res', res);
              if(res && res.body){
                this.cartData.emit(res.body)
              }
            })
  }

  removefromCartAPI(cartId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`)
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);  
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }
}