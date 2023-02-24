import { Injectable,EventEmitter } from '@angular/core';
import {  HttpClient} from '@angular/common/http'
import { SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient,private route:Router) { }
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  usersignUp(data:SignUp){
     this.http.post('http://localhost:3000/seller-auth',data,{observe:'response'})
     .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      
      localStorage.setItem('seller',JSON.stringify(result.body));

      this.route.navigate(['seller-home']);
     })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home'])
    }
  }

  userLogin(data:SignUp){
    // console.warn(data)
    this.http.get(`http://localhost:3000/seller-auth?email=${data.email}&pwd=${data.pwd}`,{observe:'response'})
    .subscribe((result:any)=>{
      console.warn(result);
     if(result && result.body && result.body.length){
        console.warn(`User has Logged In`) 
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.route.navigate(['seller-home'])
     }
     else{
        console.error(`User Login Failed`);      
        this.isLoginError.emit(true);
     }
    })
  }
}
