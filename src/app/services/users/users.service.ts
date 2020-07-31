import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SecureAuth } from "../../helpers/secure-auth";
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const PARAMS = new HttpParams({
  fromObject: {
  }
});
@Injectable({
  providedIn: "root",
})
export class UsersService {
  _headers: HttpHeaders;
  _secureAuth: SecureAuth;
  _token: string;
  constructor(private _http: HttpClient) {
    this._secureAuth = new SecureAuth();
    this._token = this._secureAuth.getAuthToken();
  }

  get = (_controllerName: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._token,
      }),
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/`;
    return this._http.get(_url, httpOptions);
  };

  getByType = (_controllerName: string, _method: string, _typeId: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._token,
      }),
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/${_method}?typeId=${_typeId}`;
    return this._http.get(_url, httpOptions);
  };

  getById = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._token,
      }),
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}/${params}`;
    return this._http.get(_url, httpOptions);
  };

  update = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this._token,
      }),
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}`;
    return this._http.put(_url, params, httpOptions);
  };

  save = (_controllerName: string, params: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this._token,
      }),
    };
    let _url = `${environment.BASE_API_URL}${_controllerName}`;
    return this._http.post(_url, params, httpOptions);
  };

  searchBusinessOwners = (term: string) => {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this._token,
      }),
    };
    if (term === '') {
      return of([]);
    }
    return this._http
      .get(`${environment.BASE_API_URL}users/search/business-owners?SearchText=${term}`, httpOptions).pipe(
        map((response: any) => response.filter(x => x.title))
      );
  }
}
