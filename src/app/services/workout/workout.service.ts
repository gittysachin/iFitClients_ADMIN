import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SecureAuth } from "../../helpers/secure-auth";

@Injectable({
  providedIn: "root",
})
export class WorkoutService {
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
    console.log(params)
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
}
