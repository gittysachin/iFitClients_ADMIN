import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { process } from '@progress/kendo-data-query';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-super-users',
  templateUrl: './super-users.component.html'
})
export class SuperUsersComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  userSearchParams: null;
  userTypes: [] = [];
  itemsPerPage: number;
  totalItems: any;
  page: any = 1;
  previousPage: any;

  public gridData: any[] = [];
  public gridView: any[];

  public mySelection: string[] = [];
  constructor(private service: UsersService, private _router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.bindUsers()
  }

  bindUsers() {
    this.spinner.show();
    const controllerName = 'users';
    this.service.get(controllerName).subscribe((response: any) => {
      this.gridData = response.res;
      this.gridView = this.gridData;
      this.spinner.hide();
    })
  }

  onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'first_name',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'last_name',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'email',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'sex',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'salutation',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'dob',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'facility_code',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'city',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'state',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'zipcode',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

  AddNewUser() {
    this._router.navigate(["/manage/users/add"]);
  }

  EditUsers(userId: number) {
    this._router.navigate([`/manage/users/edit/${userId}`]);
  }

  onCellClick(e: any) {
    this._router.navigate([`/manage/users/edit/${e.dataItem.id}`]);
  }
}
