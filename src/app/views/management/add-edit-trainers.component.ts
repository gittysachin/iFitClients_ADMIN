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
  _userTypes: [] = [];
  _states: [] = [];
  _districts: [] = [];
  _talukas: [] = [];
  _cities: [] = [];
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
  }

  ngOnInit() {
    this.GetUserById();
  }
  GetUserById() {
    // let _controllerName = 'Users';
    // let _methodName = 'GetUserById';
    if (this.id !== undefined && this.id !== null) {
      this._user = employees.filter(x => x.id.toString() === this.id.toString())[0];
      console.log(this._user);
      // this._userSevice.userById(_controllerName, _methodName, this.id).subscribe((ud: any) => {
      //   this._user = ud;
      //   this._user.ConfirmPassword = ud.Password;
      //   this._user.BirthDate = new Date(ud.BirthDate);
      //   this.getAllDistricts(this._user.StateId);
      //   this.getAllTalukas(this._user.DistrictId);
      //   this.GetAllCities(this._user.TalukaId);
      // });
    }
  }

  BackToList() {
    this._router.navigate(["/manage/trainers-management"]);
  }

  SaveUsers() {
    // let _controllerName = "Users";
    // let _methodName = "SaveUsers";
    // let encryptedUser = sessionStorage.getItem('user');
    // this._decryptedUser = JSON.parse(this._secureAuth.decryptUsingAES256(encryptedUser));
    // if (this.id !== undefined && this.id !== null) {
    //   this._user.UpdatedBy = this._decryptedUser.UserId;
    // } else {
    //   this._user.CreatedBy = this._decryptedUser.UserId;
    // }
    // this._userSevice.Users(_controllerName, _methodName, this._user).subscribe((ur: any) => {
    //   if (ur !== undefined && ur !== 'undefined' && ur !== null && ur !== 'null' && ur !== '') {
    this.BackToList();
    //   }
    // })
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
