import { Component, OnInit } from '@angular/core';
import { SignUp } from 'src/app/data-type';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user:UserAuthService) { }

  ngOnInit(): void {
  }
  
  signIn:boolean = true;
  errorComment:string =''
  
  header = this.signIn ? "Sign Up Form" : "Login Form";
  toggle(){
    this.signIn = this.header == "Sign Up Form"? false : true;
    this.header = this.signIn ? "Sign Up Form" : "Login Form";
  }

  signUp(data:SignUp): void {

    if(this.signIn){
      console.log(this.signIn)
      // console.log('Signup', data)
      this.user.userSignUp(data);
    }
    
    else {
      console.log(this.signIn);
      // console.warn('Login',data);
      this.user.userLogIn(data);
      // this.seller.isLoginError.subscribe((response)=>{
      //   if(response){
      //     this.errorComment='User Email or Password is Incorrect'
      //   }
      // })
    }

  }
}
