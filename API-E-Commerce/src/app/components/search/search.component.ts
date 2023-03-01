import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit  {

  searchResult : undefined | Products[];
  constructor(private activeRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log('Search',query);
    
    query && this.productService.searchProduct(query).subscribe((res)=>{
      this.searchResult = res;
    });

  };
}