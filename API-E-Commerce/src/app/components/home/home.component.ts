import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  products : undefined | Products[];
  trendyProducts : undefined | Products[]
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((res)=>{
      this.products = res;
    });

    this.productService.trendyProducts().subscribe((res)=>{
      this.trendyProducts = res;
    });
  }

}
