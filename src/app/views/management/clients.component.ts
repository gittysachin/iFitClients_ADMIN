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

  _dates: any = new Date();
  _pdfFileName = `Clients_${Date.parse(this._dates)}.pdf`;
  _excelFileName = `Clients_${Date.parse(this._dates)}.xlsx`;
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
    this._types = [
      { typeId: "40eec394-8d0f-426a-a43a-f4a55e3efea1", type: "Admin" },
      { typeId: "51882a3c-33f9-4ff5-a721-4d1ba86430e2", type: "Trainer" },
      { typeId: "5a9b19d7-09c2-4c88-8254-c19277896160", type: "Client" },
      { typeId: "ae78a41e-f9a7-4bc9-b020-df5239be398f", type: "Super Admin" }
    ];
  }

  ngOnInit() {
    // this.gridView = this.gridData;
    this.getClients();
    // console.log(this._types);
  }

  getClients() {
    const _controllerName = "users";
    const _methodName = "user/by-type";
    const _type = this._types.find(t => t.type === 'Client');
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._users
        .getByType(_controllerName, _methodName, _type.typeId)
        .subscribe((ut: any) => {
          if(ut && ut.res) {
            ut.res.map(data => { data.country = "US"; data.is_online = true; data.address = data.address1 + " " + data.address2; data.rating = 3; })
            this.gridView = ut.res;
          }
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
    // this._router.navigate([`/manage/client-management/edit/${obj.id}`]);
    this._router.navigate([`/manage/client-management/profile/${obj.id}`]);
  }

  onCellClick(e: any) {
    let obj = {
      id: e.dataItem.id,
      full_name: e.dataItem.full_name,
    };
    let data = btoa(JSON.stringify(obj));
    localStorage.setItem("selectedclient", JSON.stringify(data));
    this._router.navigate([`/manage/client-management/profile/${obj.id}`]);
  }
}
