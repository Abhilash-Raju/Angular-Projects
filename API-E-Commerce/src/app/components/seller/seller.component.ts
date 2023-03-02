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

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signIn:boolean = true;
  errorComment:string =''
  
  header = this.signIn ? "Seller Sign Up Form" : "Seller Login Form";
  toggle(){
    this.signIn = this.header == "Seller Sign Up Form"? false : true;
    this.header = this.signIn ? "Seller Sign Up Form" : "Seller Login Form";
  }

  signUp(data:SignUp): void {

    if(this.signIn){
      this.seller.usersignUp(data);
    }
    
    else {
      console.warn(data);
      this.seller.userLogin(data);
      this.seller.isLoginError.subscribe((response)=>{
        if(response){
          this.errorComment='User Email or Password is Incorrect'
        }
      })
    }

  }
}
