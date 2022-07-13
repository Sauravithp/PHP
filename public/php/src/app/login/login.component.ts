import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserDetailService } from '../service/user-detail.service';

export class Credentails {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("loginForm")
  loginForm!: NgForm;

  user: Credentails = new Credentails("sauravi", "jill");

  @Input()
  isLoginFormEnabled:boolean=false;

  @Output()
  loginEvent:EventEmitter<boolean>=new EventEmitter<boolean>;

  @Output()
  cancelEvent:EventEmitter<boolean>=new EventEmitter<boolean>;

  hasFail:boolean=false;

  message!:string;

  constructor(private service:UserDetailService,private _router:Router) {
  }

  ngOnInit(): void {
    console.log("init called");

    setTimeout(() => {
      this.loginForm.setValue(this.user);
    }, 0);
  }

  onLogin(): void {
    console.log("Login Clicked")
    // console.log(this.user.username," ",this.user.password );
    console.log(this.loginForm.value);
     const login:Credentails=new Credentails(this.loginForm.value.username,this.loginForm.value.password)
    this.service.login(login).subscribe({
      next: (loginResult)=>{
          console.log(loginResult);
          this.isLoginFormEnabled=false;
          this.loginEvent.emit(true);
          localStorage.setItem("isLoggedIn","true");
        },
        error: (error)=>{
          console.log("error",error);
          this.loginForm.reset();
          this.hasFail=true;
          this.message="username or password incorrect";
        }
      });
      
  }

  onCancel(): void {
    console.log("Login Clicked")
    // console.log(this.user.username," ",this.user.password );
    console.log(this.loginForm.value);
     const login:Credentails=new Credentails(this.loginForm.value.username,this.loginForm.value.password)
    // this.service.login(login).subscribe({
    //   next: loginResult=>{},
    //   error: error=>{},
    //   complete: ()=>{
        
    //   }
    // });
      // this._router.navigate(["navigate"]);
      this.cancelEvent.emit(false);
  }

}

