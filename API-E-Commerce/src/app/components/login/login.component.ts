import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Products, SignUp } from 'src/app/data-type';
import { ProductsService } from 'src/app/services/products.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user:UserAuthService,private router:Router, private productService:ProductsService) { }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  
  signup:boolean = true;
  errorComment:string =''
  
  header = this.signup ? "Sign Up Form" : "Login Form";
  toggle(){
    this.signup = this.header == "Sign Up Form"? false : true;
    this.header = this.signup ? "Sign Up Form" : "Login Form";
  }

  signUp(data:SignUp): void {

    if(this.signup){
      this.user.userSignUp(data);
      this.user.isLoggedIn.subscribe((res)=>{
        if(res){
          this.errorComment='Please Enter Valid Credentials'
        }
        else {
          this.localStoreToCart()
        }
      })   
    }
    
    else {
      this.user.userLogIn(data);  
      this.user.isLoggedIn.subscribe((res)=>{
        if(res){
          this.errorComment='Please Enter Valid Credentials'
        }
        else {
          this.localStoreToCart()
        }
      })    
    }

  }

  localStoreToCart(){
    let data=localStorage.getItem('localCart');
    let user1 = localStorage.getItem('user');
    console.log('Login User', user1);
    let userData = user1 && JSON.parse(user1);
    console.log('Login userData',userData)
    let userId = userData.id;
    console.log('Login UserID', userId);

    if(data){
      let cartDataList:Products[] = JSON.parse(data)
      console.log('User', user1);
        cartDataList.forEach((product:Products,index)=>{
          let cartData:Cart={
            ...product,
            productId:product.id,
            userId
          }
          delete cartData.id;
          setTimeout(()=>{
            this.productService.addToCart(cartData).subscribe((res)=>{
              if(res){
                console.log('Item in DB',res)
              }
            })
            if(cartDataList.length === index+1){
              localStorage.removeItem('localCart');
            }
          },400);
        })
      }
      setTimeout(()=>{
        this.productService.getCartList(userId)
      },500)
  }
}
