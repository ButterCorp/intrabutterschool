import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => { 
        this.router.navigate(['classroom'])
      })
    .catch((err) => console.log(err));
  }

}
