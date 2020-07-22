import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { UserMaster } from '../../models/users/user-master';
import { UsersService } from '../../services/users/users.service';
import * as CanvasJS from '../../../assets/js/chart/canvasjs.min'

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddEditClientComponent implements OnInit {

  id: any;
  _title: string;
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
  constructor(private _router: Router) {
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
    this.bindChart()
  }

  bindChart() {
    let dataPoints = [];
    let y = 0;
    for (var i = 0; i < 10000; i++) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y });
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Progress"
      },
      data: [{
        type: "line",
        dataPoints: dataPoints
      }]
    })
    chart.render();
  }


  BackToList() {
    this._router.navigate(["/manage/client-management"]);
  }
}
