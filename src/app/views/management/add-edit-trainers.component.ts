import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { UserMaster } from '../../models/users/user-master';
import { UsersService } from '../../services/users/users.service';
import { SecureAuth } from '../../helpers/secure-auth';
import { employees } from './employees'


@Component({
  selector: 'app-add-edit-trainers',
  templateUrl: './add-edit-trainers.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddEditTrainersComponent implements OnInit {
  id: number;
  _title: string;
  _user: any;
  _userTypes: any;
  _states: [] = [];
  _districts: [] = [];
  _talukas: [] = [];
  _cities: [] = [];
  file: File;
  _gender = [
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Not Specified" },
  ];
  _decryptedUser: any;
  _secureAuth: SecureAuth;
  _isMobileValid: boolean;
  _isEmailValid: boolean;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _userSevice: UsersService) {
    this.id = this._activatedRoute.snapshot.params.id;
    this._secureAuth = new SecureAuth();
    this._isMobileValid = true;
    this._isEmailValid = true;
    if (this.id) {
      this._title = "Edit";
    } else {
      this._title = "Add";
    }
    this._user = new UserMaster();
    let sidebarRootElement = document.getElementById('root');
    sidebarRootElement.style.display = 'block';
    let sidebarChildElement = document.getElementById('child');
    sidebarChildElement.style.display = 'none';
    this._userTypes = [
      { UserTypeId: "40eec394-8d0f-426a-a43a-f4a55e3efea1", UserTypeDescription: "Admin" },
      { UserTypeId: "51882a3c-33f9-4ff5-a721-4d1ba86430e2", UserTypeDescription: "Trainer" },
      { UserTypeId: "5a9b19d7-09c2-4c88-8254-c19277896160", UserTypeDescription: "Client" },
      { UserTypeId: "ae78a41e-f9a7-4bc9-b020-df5239be398f", UserTypeDescription: "Super Admin" }
    ];
    this._user.Gender=null;
  }

  ngOnInit() {
    this.GetUserById();
  }
  GetUserById() {
    let _controllerName = 'Users';
    if (this.id !== undefined && this.id !== null) {
      this._userSevice.getById(_controllerName, this.id).subscribe((ud: any) => {
        if(ud && ud.res) {
          this._user.UserId = ud.res.id;
          this._user.FirstName = ud.res.first_name;
          this._user.UserTypeId = ud.res.user_type_id;
          this._user.LastName = ud.res.last_name;
          this._user.EmailId = ud.res.email;
          this._user.BirthDate = new Date(ud.res.dob);
          this._user.Mobile = ud.res.phone;
          this._user.Avatar = ud.res.avatar_uri;
          this._user.Gender = ud.res.sex;
          this._user.Salutation =
            ud.res.salutation === undefined ? "" : ud.res.salutation;
          this._user.Password = ud.res.credentials;
          this._user.ConfirmPassword = ud.res.credentials;
          this._user.About = ud.res.about;
          this._user.Address1 = ud.res.address1;
          this._user.Address2 = ud.res.address2;
          this._user.ZipCode = ud.res.zipcode;
        }
        // this._user.ConfirmPassword = ud.Password;
        // this._user.BirthDate = new Date(ud.BirthDate);
      });
    } 
  }

  BackToList() {
    this._router.navigate(["/manage/trainers-management"]);
  }

  onChange(event: any) {
    var files = event.srcElement.files;
    this.file = files[0];
  }

  SaveUsers() {
    const _controllerName = "Users";
    const encryptedUser = sessionStorage.getItem("user");
    this._decryptedUser = JSON.parse(encryptedUser);
    if (this.id !== undefined && this.id !== null) {
      this._user.UpdatedBy = this._decryptedUser.UserId;
      this._user.UserId = this._activatedRoute.snapshot.params.id;
    } else {
      this._user.CreatedBy = this._decryptedUser.UserId;
    }
    let formData: FormData = new FormData();
    formData.append("UserId", this._user.UserId);
    formData.append("avatar_uri", this.file || this._user.Avatar);
    formData.append("user_type_id", this._user.UserTypeId);
    formData.append("first_name", this._user.FirstName);
    formData.append("last_name", this._user.LastName);
    formData.append("phone", this._user.Mobile);
    formData.append("email", this._user.EmailId);
    formData.append("salutation", this._user.Salutation);
    if (this._user.BirthDate) {
      formData.append("dob", this._user.BirthDate.toString());
    }
    formData.append("sex", this._user.Gender);
    formData.append("credentials", this._user.Password);
    formData.append("address1", this._user.Address1);
    formData.append("address2", this._user.Address2);
    formData.append("zipcode", this._user.ZipCode);
    formData.append("about", this._user.About);
    if(this._user.UserId) {
      this._userSevice
      .update(_controllerName, formData)
      .subscribe((ur: any) => {
        if (
          ur !== undefined &&
          ur !== "undefined" &&
          ur !== null &&
          ur !== "null" &&
          ur !== ""
          ) {
            setTimeout(() => {
              this.BackToList();
            }, 5000);
          }
        });
      }
      else {
        this._userSevice
        .save(_controllerName, formData)
        .subscribe((ur: any) => {
          if (
            ur !== undefined &&
            ur !== "undefined" &&
            ur !== null &&
            ur !== "null" &&
            ur !== ""
            ) {
              setTimeout(() => {
                this.BackToList();
              }, 5000);
            }
          });
      }
  }

  validateColumns(_columnName: string, _params: string) {
    // if (this.id === undefined || this.id === null) {
    //   let _controllerName = "Users";
    //   let _methodName = "ValidateDuplicates";
    //   if (_params !== undefined && _params !== 'undefined' && _params !== '' && _params !== null && _params !== 'null') {
    //     this._userSevice.ValidateParams(_controllerName, _methodName, _columnName, _params).subscribe((vc: any) => {
    //       if (_columnName === 'email') {
    //         this._isEmailValid = vc;
    //       } else if (_columnName === 'mobile') {
    //         this._isMobileValid = vc
    //       }
    //     })
    //   } else {
    //     if (_columnName === 'email') {
    //       this._isEmailValid = true;
    //     } else if (_columnName === 'mobile') {
    //       this._isMobileValid = true;
    //     }
    //   }
    // }
  }

}
