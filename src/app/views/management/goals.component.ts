import { Component, OnInit } from '@angular/core';
import { UserMaster } from '../../models/users/user-master';
import { SecureAuth } from '../../helpers/secure-auth';
import { GoalsData } from '../../../assets/resources/goal';
import { GoalsService } from "../../services/goals/goals.service";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html'
})
export class GoalsComponent implements OnInit {
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
  public gridData: any[] = GoalsData;
  constructor(private _router: Router, private modalService: NgbModal, private _goals: GoalsService) {
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
    this.getGoals();
  }

  getGoals() {
    const _controllerName = "goals";
    const _methodName = "getGoals";
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._goals
        .get(_controllerName, _methodName, {id: this._userObject.id})
        .subscribe((ut: any) => {
          if(ut && ut.res) {
            console.log(ut.res);
            this.gridData = ut.res;
          }
        });
    }
  }

  AddGoal(modal: any) {
    this.modalService.open(modal, {
      backdrop: true,
      centered: true
    })
  }

  BackToList() {
    this._router.navigate(["/manage/client-management"]);
  }
}
