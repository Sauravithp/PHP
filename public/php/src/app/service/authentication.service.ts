import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  get isLoggedIn(){
    if(localStorage.getItem("isLoggedIn")){
      return true;
    }else{
      return false;
    }
  }
}
