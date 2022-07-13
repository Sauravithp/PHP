import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDetailService } from '../service/user-detail.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input()
  enbaledRegister!:boolean;

  #registrationForm!:FormGroup;

  get registrationForm(){
    return this.#registrationForm
  }

  hasSuccess:boolean=false;
  hasFail:boolean=false;
  @Output()
  cancelEvent:EventEmitter<boolean>=new EventEmitter<boolean>;

  message!:string;

  constructor(private _formBuilder:FormBuilder,private userService:UserDetailService) {
    // this.#registrationForm=new FormGroup({
    //   name: new FormControl("Sauravi"),
    //   username: new FormControl("thapa"),
    //   password: new FormControl("123"),
    //   repeatPassword: new FormControl("123"),
    // });
   }

  ngOnInit(): void {
    this.#registrationForm=this._formBuilder.group({
      name:"",
      username:"",
      password:"",
      repeatPassword:""
    });
  }

  onSubmit(): void{
    console.log("submit called")
    console.log(this.#registrationForm.value);
    this.userService.register({
      'name':this.#registrationForm.value.name,
      'username':this.#registrationForm.value.username,
      'password':this.#registrationForm.value.password,
    }).subscribe(response=>{
      console.log(response);
      console.log("registered");
      this.hasSuccess=true;
      this.message=this.#registrationForm.value.username+" Successfully Registered";
      this.#registrationForm.reset();
    });
  }

  onCancel(): void {
    console.log("Login Clicked")
    // console.log(this.user.username," ",this.user.password );
    // console.log(this.loginForm.value);
    //  const login:Credentails=new Credentails(this.loginForm.value.username,this.loginForm.value.password)
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
