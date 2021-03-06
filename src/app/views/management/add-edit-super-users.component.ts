import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecureAuth } from '../../helpers/secure-auth';
import { UsersService } from '../../services/users/users.service';
import { iFItSuperUser } from '../../models/users/ifit-user';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-super-users',
  templateUrl: './add-edit-super-users.component.html'
})
export class AddEditSuperUsersComponent implements OnInit {
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
    dateFormat: 'mm/dd/yyyy'
  };

  searchingBusinessOwner: boolean = false;
  isBusinessOwnerFoundLength: any;
  searchFailedForBusinessOwner: any;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private service: UsersService, private spinner: NgxSpinnerService) {
    this.id = this._activatedRoute.snapshot.params.id;
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
        this.iFitUser.confirmcredentials = ud.res.credentials;
        if (this.iFitUser.dob) {
          this.iFitUser.dob = {
            isRange: false,
            singleDate: {
              date: {
                year: ud.res.dob.substring(10, 6),
                month: parseInt(ud.res.dob.substring(0, 2)),
                day: parseInt(ud.res.dob.substring(3, 5))
              }
            }
          };
        }
        if(this.iFitUser.bownerid) {
          let selectedBOwnerId = {
            id: ud.res.bownerid,
            title: ud.res.business_name
          }
          this.iFitUser.bownerid = selectedBOwnerId; 
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
  }

  BackToList() {
    this._router.navigate(["/manage/users"]);
  }

  uploadFile(files: File) {
    this.fileToUpload = files[0];
    let element: any = document.getElementById('userImage');
    element.src = window.URL.createObjectURL(files[0]);
  }

  BusinessOwnersResultFormatBandListValue(value: any) {
    return value.title;
  }

  BusinessOwnersInputFormatBandListValue(value: any) {
    if (value.title)
      return value.title
    return value;
  }

  searchBusinessOwner = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingBusinessOwner = true),
      switchMap(term =>
        this.service.searchBusinessOwners(term).pipe(tap((obj) => {
          this.isBusinessOwnerFoundLength = obj.length;
          this.searchFailedForBusinessOwner = false
        }), catchError(() => {
          this.searchFailedForBusinessOwner = true;
          return of([]);
        }))
      ),
      tap((obj) => {
        this.isBusinessOwnerFoundLength = obj.length;
        this.searchingBusinessOwner = false
      })
    )

  saves() {    
    this.spinner.show();
    let _controllerName = "users";
    let bownerid: any = this.iFitUser.bownerid;
    let formData = new FormData();
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
    formData.append('bownerid', bownerid.bownerid);

    if (this._title.toLowerCase() === 'edit') {
      formData.append('UserId', this.iFitUser.id);
      this.service.update(_controllerName, formData).subscribe((ur: any) => {
        this.spinner.hide();
        if (ur !== undefined && ur !== 'undefined' && ur !== null && ur !== 'null' && ur !== '') {
          this.BackToList();
        }
      })
    } else {
      this.service.save(_controllerName, formData).subscribe((ur: any) => {
        this.spinner.hide();
        if (ur !== undefined && ur !== 'undefined' && ur !== null && ur !== 'null' && ur !== '') {
          this.BackToList();
        }
      })
    }
  }
}
