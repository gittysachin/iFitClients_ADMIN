import { Component, OnInit } from '@angular/core';
import { UserMaster } from '../../models/users/user-master';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecureAuth } from '../../helpers/secure-auth';
import { iFItSuperUser } from '../../models/users/ifit-user';
import moment from 'moment';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class ClientProfileComponent implements OnInit {
  id: number;
  _title: string;
  iFitUser: iFItSuperUser;
  _secureAuth: SecureAuth;
  fileToUpload: File = null;
  userTypes: [];
  sexType = [{
    id: "male",
    value: 'Male'
  }, {
    id: "female",
    value: 'Female'
  }, {
    id: "other",
    value: 'Other'
  }]
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mm/dd/yyyy',
    alignSelectorRight: true
  };
  _user: UserMaster;
  _userTypes: [] = [];
  _states: [] = [];
  _districts: [] = [];
  _talukas: [] = [];
  _cities: [] = [];
  _decryptedUser: any;
  _isMobileValid: boolean;
  _isEmailValid: boolean;
  _userObject: any
  constructor(private _router: Router, private modalService: NgbModal, private _activatedRoute: ActivatedRoute, private service: UsersService, private spinner: NgxSpinnerService) {
    let user = localStorage.getItem('selectedclient');
    let parsedUser: any = atob(JSON.parse(user));
    this.id = JSON.parse(parsedUser).id;
    this._secureAuth = new SecureAuth();
    if (this.id) {
      this._title = "Edit";
    } else {
      this._title = "Add";
    }
    this.iFitUser = new iFItSuperUser();
    let sidebarRootElement = document.getElementById('root');
    sidebarRootElement.style.display = 'block';
    let sidebarChildElement = document.getElementById('child');
    sidebarChildElement.style.display = 'none';
    this.userTypes = [];
    this.iFitUser.sex = "null";
    this.iFitUser.user_type_id = "";

    const selectedClient = localStorage.getItem('selectedclient');
    const parsedClientJson = JSON.parse(selectedClient);
    if (parsedClientJson) {
      let obj = atob(parsedClientJson);
      this._userObject = JSON.parse(obj);
      let sidebarRootElement = document.getElementById('root');
      sidebarRootElement.style.display = 'none';
      let sidebarChildElement = document.getElementById('child');
      sidebarChildElement.style.display = 'block';
    } else {
      this._title = "Add";
    }
    this._user = new UserMaster();
  }

  ngOnInit() {
    this.GetUserById();
    this.GetAllUserTypes();
  }

  GetUserById() {
    this.spinner.show();
    if (this.id !== undefined && this.id !== null) {
      let _controllerName = 'users';
      this.service.getById(_controllerName, this.id).subscribe((ud: any) => {
        this.iFitUser = ud.res;
        this.iFitUser.last_login_date = moment(ud.res.last_login_date).format('LLL');
        this.iFitUser.created_at = moment(ud.res.created_at).format('LLL');
        if (this.iFitUser.dob) {
          this.iFitUser.dob = {
            isRange: false, singleDate: {
              date: {
                year: ud.res.dob.substring(10, 6),
                month: parseInt(ud.res.dob.substring(0, 2)),
                day: parseInt(ud.res.dob.substring(3, 5))
              }
            }
          };
        }
        this.spinner.hide();
      });
    }
  }

  GetAllUserTypes() {
    this.spinner.show();
    let _controllerName = 'users/user/types';
    this.service.get(_controllerName).subscribe((ud: any) => {
      this.userTypes = ud.res;
      this.spinner.hide();
    });
    this.spinner.hide();
  }

  // BackToList() {
  //   this._router.navigate(["/dashboard"]);
  // }

  uploadFile(files: File) {
    this.fileToUpload = files[0];
    let element: any = document.getElementById('userImage');
    element.src = window.URL.createObjectURL(files[0]);
  }

  saves() {
    this.spinner.show();
    let _controllerName = "users";
    let formData = new FormData();
    formData.append('UserId', this.iFitUser.id);
    formData.append('first_name', this.iFitUser.first_name);
    formData.append('last_name', this.iFitUser.last_name);
    formData.append('avatar_uri', this.fileToUpload || this.iFitUser.avatar_uri);
    formData.append('user_type_id', this.iFitUser.user_type_id);
    formData.append('about', this.iFitUser.about);
    formData.append('salutation', this.iFitUser.salutation);
    formData.append('credentials', this.iFitUser.credentials);
    formData.append('sex', this.iFitUser.sex || null);
    formData.append('dob', this.iFitUser.dob && this.iFitUser.dob.singleDate && this.iFitUser.dob.singleDate.formatted);
    formData.append('phone', this.iFitUser.phone);
    formData.append('email', this.iFitUser.email);
    formData.append('address1', this.iFitUser.address1);
    formData.append('address2', this.iFitUser.address2);
    formData.append('city', this.iFitUser.city);
    formData.append('state', this.iFitUser.state);
    formData.append('zipcode', this.iFitUser.zipcode);
    formData.append('facility_code', this.iFitUser.facility_code);
    formData.append('id', this.iFitUser.id);
    this.service.update(_controllerName, formData).subscribe((ur: any) => {
      if (ur !== undefined && ur !== 'undefined' && ur !== null && ur !== 'null' && ur !== '') {
        this.spinner.hide();
        this.BackToList();
      }
      this.spinner.hide();
    })
    this.spinner.hide();
  }

  UpdateProfile() {

  }

  BackToList() {
    this._router.navigate(["/manage/client-management"]);
  }

}
