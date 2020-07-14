import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SecureAuth } from '../../helpers/secure-auth';

@Injectable({
  providedIn: 'root'
})
export class BOwnerService {

  _headers: HttpHeaders;
  _secureAuth: SecureAuth;
  _token: string;
  constructor(private _http: HttpClient) {
    this._secureAuth = new SecureAuth();
    this._token = this._secureAuth.getAuthToken();
  }

  getOwners = (_controllerName: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/`;
    return this._http.get(_url, httpOptions);
  }

  getOwnersById = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/${params}`;
    return this._http.get(_url, httpOptions);
  }

  updateOwner = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}`;
    return this._http.put(_url, params, httpOptions);
  }

  SaveOwner = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this._token
      })
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}`;
    return this._http.post(_url, params, httpOptions);
  }

}
