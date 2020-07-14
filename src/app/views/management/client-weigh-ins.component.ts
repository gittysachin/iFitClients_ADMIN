import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecureAuth } from '../../helpers/secure-auth';
import { UserMaster } from '../../models/users/user-master';
import { WeighIns } from '../../../assets/resources/weigh-in';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-weigh-ins',
  templateUrl: './client-weigh-ins.component.html'
})
export class ClientWeighInsComponent implements OnInit {

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
  public gridData: any[] = WeighIns;
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

  AddWeighIn(modal: any) {
    this.modalService.open(modal, {
      backdrop: true,      
      centered: true
    })
  }

  BackToList() {
    this._router.navigate(["/manage/client-management"]);
  }
}
