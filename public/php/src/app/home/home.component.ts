import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title="";
  isTitleEnabled=this.authenticationService.isLoggedIn;

  constructor(private authenticationService:AuthenticationService) { 

  }

  ngOnInit(): void {
    console.log("test home")
  this.title="test"
  }

}
