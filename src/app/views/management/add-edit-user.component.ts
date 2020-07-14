import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { BusinessOwners } from '../../models/owners/business-owners';
import { SecureAuth } from '../../helpers/secure-auth';
import { BOwnerService } from '../../services/b-owner/b-owner.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddEditUserComponent implements OnInit {

  id: number;
  _title: string;
  _businessOwners: any;
  _secureAuth: SecureAuth;
  fileToUpload: File = null;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _bOwnerService: BOwnerService, private spinner: NgxSpinnerService) {
    this.id = this._activatedRoute.snapshot.params.id;
    this._secureAuth = new SecureAuth();
    if (this.id) {
      this._title = "Edit";
    } else {
      this._title = "Add";
    }
    this._businessOwners = new BusinessOwners();
    let sidebarRootElement = document.getElementById('root');
    sidebarRootElement.style.display = 'block';
    let sidebarChildElement = document.getElementById('child');
    sidebarChildElement.style.display = 'none';
  }

  ngOnInit() {
    this.GetUserById();
  }

  GetUserById() {
    this.spinner.show();
    if (this.id !== undefined && this.id !== null) {
      let _controllerName = 'business-owners';
      this._bOwnerService.getOwnersById(_controllerName, this.id).subscribe((ud: any) => {
        this._businessOwners = ud.res;
        this.spinner.hide();
      });
      this.spinner.hide();
    }
    this.spinner.hide();
  }

  BackToList() {
    this._router.navigate(["/manage/business-owners"]);
  }

  uploadFile(files: File) {
    this.fileToUpload = files[0];
    let element: any = document.getElementById('userImage');
    element.src = window.URL.createObjectURL(files[0]);
  }

  SaveOwners() {
    this.spinner.show();
    let _controllerName = "business-owners";
    let formData = new FormData();
    formData.append('id', this._businessOwners.id);
    formData.append('business_name', this._businessOwners.business_name);
    formData.append('business_logo_url', this.fileToUpload);
    formData.append('facility_code', this._businessOwners.facility_code);
    formData.append('address1', this._businessOwners.address1);
    formData.append('address2', this._businessOwners.address2);
    formData.append('city', this._businessOwners.city);
    formData.append('state', this._businessOwners.state);
    formData.append('zipcode', this._businessOwners.zipcode);
    if (this._title.toLowerCase() === 'edit') {
      this._bOwnerService.updateOwner(_controllerName, formData).subscribe((ur: any) => {
        if (ur !== undefined && ur !== 'undefined' && ur !== null && ur !== 'null' && ur !== '') {
          this.spinner.show();
          this.BackToList();
        }
      })
    } else {
      this._bOwnerService.SaveOwner(_controllerName, formData).subscribe((ur: any) => {
        if (ur !== undefined && ur !== 'undefined' && ur !== null && ur !== 'null' && ur !== '') {
          this.spinner.hide();
          this.BackToList();
        }
      })
    }
    this.spinner.hide();
  }
}
