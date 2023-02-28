import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | Products[];
  productDel:undefined | string;
  iconDel = faTrash;
  iconEdit = faEdit;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.productService.productList().subscribe((result) =>{
      // console.log(result);
      this.productList=result;
    })
  }

  deleteProduct(id:number){
    console.log('test id', id);
    this.productService.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.productDel = 'Product is deleted'
      }
    })
    setTimeout(()=>{
      this.productDel=undefined;
      window.location.reload();
    },3000);

  }  
}
