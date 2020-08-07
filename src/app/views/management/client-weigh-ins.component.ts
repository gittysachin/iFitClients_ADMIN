import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MeasurementsService } from "../../services/measurements/measurements.service";
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
  constructor(private _router: Router, private modalService: NgbModal, private _measurements: MeasurementsService) {
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
    this.getWeignIns();
  }

  getWeignIns() {
    const _controllerName = "measurements";
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._measurements
        .get(_controllerName, {id: this._userObject.id})
        .subscribe((ut: any) => {
          if(ut && ut.res) {
            console.log(ut.res);
            this.gridData = ut.res;
          }
        });
    }
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
