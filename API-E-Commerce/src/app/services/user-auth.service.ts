import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUp){
    this.http.post('http://localhost:3000/user-auth',user,{observe:'response'})
    .subscribe((res)=>{
      console.log("SignUp Service", res);
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.router.navigate(['/']);
      }
    })
  }
  userLogIn(user:SignUp){

  }
}
