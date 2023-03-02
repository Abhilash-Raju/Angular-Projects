import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/data-type';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user:UserAuthService,private router:Router) { }
  ngOnInit(): void {
    // this.user.isLoggedIn.subscribe((res)=>{
    //   if(res){
    //     this.router.navigate(['']);
    //   }
    // })

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
      // console.log(this.signup)
      // console.log('Signup', data)
      this.user.userSignUp(data);
    }
    
    else {
      // console.log(this.signup);
      // console.warn('Login',data);
      this.user.userLogIn(data);  
      this.user.isLoggedIn.subscribe((res)=>{
        if(res){
          this.errorComment='Please Enter Valid Credentials'
        }
      })    
    }

  }
}
