import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Users } from '../../models/auth/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _bashApiUrl: string;
  constructor(private _http: HttpClient) {
    this._bashApiUrl = environment.BASE_API_URL;
  }

  authUsers = (_controller: string, _method: string, _users: Users) => {
    return this._http.post(`${this._bashApiUrl}${_controller}/${_method}`, _users);
  }

}
