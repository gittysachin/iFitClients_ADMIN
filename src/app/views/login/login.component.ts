import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/auth/users';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from "@angular/router"
import { SecureAuth } from '../../helpers/secure-auth';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  _user: Users;
  _authController: string;
  _authMethod: string;
  _encPassword: string;
  _secureAuth: SecureAuth;
  Message: string;
  StatusCode: number;
  StatusText: string;


  constructor(private _auth: AuthService, private router: Router, private spinner: NgxSpinnerService) {
    this._user = new Users();
    this._secureAuth = new SecureAuth();
  }

  ngOnInit() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  validateUser = () => {
    this.spinner.show();
    this._authController = 'auth';
    this._authMethod = 'login';
    if (this._user) {
      this._auth.authUsers(this._authController, this._authMethod, this._user).subscribe((_users: any) => {
        if (_users && _users.token) {
          sessionStorage.setItem('token', _users.token);
          sessionStorage.setItem('user', JSON.stringify(_users.user));
          this.router.navigate(['/dashboard']);
        } else {
          this.Message = _users.message
        }
        this.spinner.hide();
      }, (error) => {
        this.Message = `Error while authenticating user details. Please try again!`;
        this.spinner.hide();
      })
    } else {
      this.spinner.hide();
      this.Message = 'Something went wrong!';
    }
  }
}
