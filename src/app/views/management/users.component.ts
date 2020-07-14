import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { BOwnerService } from '../../services/b-owner/b-owner.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  userTypes: [] = [];
  itemsPerPage: number;
  totalItems: any;
  page: any = 1;
  previousPage: any;

  public gridData: any[] = [];
  public gridView: any[];

  public mySelection: string[] = [];

  constructor(private _router: Router, private _bOwnerService: BOwnerService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.bindBOwners();
  }

  bindBOwners() {
    this.spinner.show();
    const controllerName = 'business-owners';
    this._bOwnerService.getOwners(controllerName).subscribe((response: any) => {
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
            field: 'business_name',
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
    this._router.navigate(["/manage/business-owners/add"]);
  }

  EditUsers(userId: number) {
    this._router.navigate([`/manage/business-owners/edit/${userId}`]);
  }
}
