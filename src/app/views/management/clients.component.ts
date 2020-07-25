import { Component, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "../../services/users/users.service";
import { UserRequestParams } from "../../models/users/user-request-params";
import { Router } from "@angular/router";
import { UserSearchParams } from "../../models/users/user-search-params";
import { UserType } from "../../models/users/user-type";
import * as data from "../../../assets/resources/users.json";
// import { Grid } from 'ag-grid-community';
// import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from "@angular/common/http";
// import { environment } from '../../../environments/environment';

import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { employees } from "./employees";
import { SecureAuth } from "../../helpers/secure-auth";
import { images } from "./images";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
})
export class ClientsComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true })
  dataBinding: DataBindingDirective;
  _userRequestParams: UserRequestParams;
  _lstUsers: any = (data as any).default;
  userSearchParams: UserSearchParams;
  userTypes: [] = [];
  itemsPerPage: number;
  _userController: string;
  _userMethod: string;
  totalItems: any;
  page: any = 1;
  previousPage: any;
  _types: any;
  _decryptedUser: any;
  _secureAuth: SecureAuth;

  public gridData: any[] = employees;
  public gridView: any[];

  public mySelection: string[] = [];

  constructor(
    private _users: UsersService,
    private _router: Router,
    private http: HttpClient
  ) {
    this._userRequestParams = new UserRequestParams();
    this.userSearchParams = new UserSearchParams();
    this.itemsPerPage = this._userRequestParams.PageSize;
    this._secureAuth = new SecureAuth();
    let sidebarRootElement = document.getElementById("root");
    sidebarRootElement.style.display = "block";
    let sidebarChildElement = document.getElementById("child");
    sidebarChildElement.style.display = "none";
    this._types = [];
  }

  ngOnInit() {
    this.gridView = this.gridData;
    this.getClients();
    // console.log(this._types);
  }

  getClients() {
    const _controllerName = "users";
    const _methodName = "by-type";
    const _type = { type: "Client" };
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._users
        .getByType(_controllerName, _methodName, _type)
        .subscribe((ut: any) => {
          console.log(ut);
        });
    }
  }

  onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "full_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;

    return image[code];
  }

  flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;

    return image[code];
  }

  AddNewUser() {
    this._router.navigate(["/manage/client-management/add"]);
  }

  EditUsers(dataItem: any) {
    let obj = {
      id: dataItem.id,
      full_name: dataItem.full_name,
    };
    let data = btoa(JSON.stringify(obj));
    localStorage.setItem("selectedclient", JSON.stringify(data));
    this._router.navigate([`/manage/client-management/edit`]);
  }

  onCellClick(e: any) {
    let obj = {
      id: e.dataItem.id,
      full_name: e.dataItem.full_name,
    };
    let data = btoa(JSON.stringify(obj));
    localStorage.setItem("selectedclient", JSON.stringify(data));
    this._router.navigate([`/manage/client-management/edit`]);
  }
}
