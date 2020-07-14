import { Component, OnInit } from '@angular/core';
import { UserMaster } from '../../models/users/user-master';
import { SecureAuth } from '../../helpers/secure-auth';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Activities } from '../../../assets/resources/activities';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent implements OnInit {
  id: any;
  _title: string;
  _user: UserMaster;
  _userTypes: [] = [];
  _states: [] = [];
  _districts: [] = [];
  _talukas: [] = [];
  _cities: [] = [];
  _decryptedUser: any;
  _secureAuth: SecureAuth;
  _isMobileValid: boolean;
  _isEmailValid: boolean;
  _userObject: any
  public gridData: any[] = Activities;
  constructor(private _router: Router, private modalService: NgbModal) {
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
  }

  AddAnUpdate(modal: any) {
    this.modalService.open(modal, {
      backdrop: true,
      centered: true
    })
  }

  BackToList() {
    this._router.navigate(["/manage/client-management"]);
  }

}
