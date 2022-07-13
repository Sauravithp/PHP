import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentails } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  #baseUrl="http://localhost:3000/api/users";


  constructor(private _http:HttpClient) { }

  public register(user:any):Observable<any>{
    return this._http.post<any>(this.#baseUrl,user);
  }

  public login(user:Credentails):Observable<any>{
    const url=this.#baseUrl+"/login";
    return this._http.post<any>(url,user);
  }

}
