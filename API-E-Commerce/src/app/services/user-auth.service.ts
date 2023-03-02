import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient, private router:Router) { }

  isLoggedIn = new EventEmitter<boolean> (false);
  userSignUp(user:SignUp){
    this.http.post('http://localhost:3000/user-auth',user,{observe:'response'})
    .subscribe((res)=>{
      console.log("SignUp Service", res);
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        // this.isLoggedIn.emit(true);
        this.router.navigate(['/']);
      }
    })
  }
  userLogIn(user:SignUp){
    this.http.get(`http://localhost:3000/user-auth?email=${user.email}&pwd=${user.pwd}`,{observe:'response'})
    .subscribe((result:any)=>{
      console.warn("Login Service",result);
     if(result && result.body?.length){
        // console.warn(`User has Logged In`) 
        this.isLoggedIn.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }else{
       this.isLoggedIn.emit(true);
     }
  })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
