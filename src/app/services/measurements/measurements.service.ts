import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Users } from '../../models/auth/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecureAuth } from '../../helpers/secure-auth';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  _bashApiUrl: string;
  _headers: HttpHeaders;
  _secureAuth: SecureAuth;
  _token: string;

  constructor(private _http: HttpClient) {
    this._bashApiUrl = environment.BASE_API_URL;
    this._secureAuth = new SecureAuth();
    this._token = this._secureAuth.getAuthToken();
  }

  get = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}`;
    return this._http.post(_url, params, httpOptions);
  }

  getById = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/${params}`;
    return this._http.get(_url, httpOptions);
  }
  
  save = (_controllerName: string, _method: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/${_method}`;
    return this._http.post(_url, params, httpOptions);
  }

  update = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}`;
    return this._http.put(_url, params, httpOptions);
  }

}
