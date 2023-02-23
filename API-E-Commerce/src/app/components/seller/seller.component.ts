import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  constructor(private seller: SellerService, private route: Router) {}

  ngOnInit(): void {}
  signUp(data: SignUp): void {
    console.warn(data);
    this.seller.usersignUp(data).subscribe((res) => {
      if (res) {
        this.route.navigate(['seller-home']);
      }
    });
  }
}
