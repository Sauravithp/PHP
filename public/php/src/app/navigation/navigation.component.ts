import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';
import { Series } from '../series/series.component';
import { AuthenticationService } from '../service/authentication.service';
import { SeriesDataService } from '../service/series-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isloggedIn: boolean = this.authenticationService.isLoggedIn;

  isLoginFormEnabled: boolean = false;

  isLoggedInButtonEnabled: boolean = true;

  isRegisterFormEnabled: boolean = false;

  title=environment.application_title;

  seriesList: Series[] = [];

  count = 5;
  
  offset = 0;
 
  constructor(private _router: Router,private _service: SeriesDataService,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this._service.getAllSeries(this.offset, this.count).subscribe({
      next: (data) => {
        this.seriesList = data;
        console.log(this.seriesList);
      }
    });

  }

  onLogin(): void {
    this.isLoginFormEnabled = true;
    this.isLoggedInButtonEnabled = false;
  }

  onRegister(): void {
    this.isRegisterFormEnabled = true;
    this.isLoggedInButtonEnabled = false;
  }

  loginCancelled(cancelled: boolean): void {
    this.isLoginFormEnabled = cancelled;
    console.log("login cancelled");
    location.reload();

  }

  loginSuccessFul(sucess: boolean): void {
    this.isloggedIn = sucess;
  }

  onLogOut(): void {
    this.isloggedIn = false;
    this.isLoggedInButtonEnabled = true;
    this._router.navigate([""]);
    localStorage.clear();
  }

}
