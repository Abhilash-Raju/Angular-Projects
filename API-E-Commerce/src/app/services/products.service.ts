import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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
}
