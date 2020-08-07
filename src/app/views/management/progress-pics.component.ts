import { Component, OnInit } from '@angular/core';
import { UserMaster } from '../../models/users/user-master';
import { SecureAuth } from '../../helpers/secure-auth';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { SnapshotService } from '../../services/snapshots/snapshots.service';
import { ProgressPics } from '../../../assets/resources/progress';
import { NgxSpinnerService } from "ngx-spinner";
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress-pics',
  templateUrl: './progress-pics.component.html'
})
export class ProgressPicsComponent implements OnInit {

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
  _userObject: any;

  snapshot: any = {
    user_id: '',
    url: '',
    snapshot_date: '',
    pose: ''
  }
  modalReference: any;

  items: any;
  pageNo: any;
  public _albums: Array<any> = [];
  public gridView: any[];
  files: any = [];
  count: any;
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,    
    private _userSevice: UsersService,
    private _snapshots: SnapshotService,
    private _lightbox: Lightbox,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {
    const selectedClient = localStorage.getItem('selectedclient');
    const parsedClientJson = JSON.parse(selectedClient);
    if (parsedClientJson) {
      let obj = atob(parsedClientJson);
      this._userObject = JSON.parse(obj);
      this.snapshot.user_id = this._userObject.id;
      let sidebarRootElement = document.getElementById('root');
      sidebarRootElement.style.display = 'none';
      let sidebarChildElement = document.getElementById('child');
      sidebarChildElement.style.display = 'block';
    } else {
      this._title = "Add";
    }
    this._user = new UserMaster();
    this.items = [];
    this.pageNo = 1;
    this.count = 0;
    this.getPics();

  }

  ngOnInit() {
    this.items = Array(150).fill(0).map((x, i) => ({id: (i+1)}));
  }

  getPics() {
    // if(param) {
    //   this.pageNo = param || this.pageNo;
    // }
    this._albums = [];
    let obj = {
      "pageNo": this.pageNo,
      "pageSize": 10,
      "user_id": this._userObject.id
    }
    const _controllerName = "snapshots";
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._snapshots
        .get(_controllerName, obj)
        .subscribe((ut: any) => {
          if (ut && ut.res && ut.res.results) {
            // console.log(ut.res.results);
            // const ProgressPics = ProgressPics;
            const ProgressPics = ut.res.results;
            for (let i = 0; i < ProgressPics.length; i++) {
              const src = ProgressPics[i].url;
              const caption = ProgressPics[i].id;
              const thumb = ProgressPics[i].url;
              const date = ProgressPics[i].created_at;
              const album = {
                src: src,
                caption: caption,
                thumb: thumb,
                date: date
              };
              this.count = this.count + 1;
              this._albums.push(album);
            }
          }
        });
      }
    }

    SaveProgress(snapshotsForm, model) {
      if (snapshotsForm.form.status == "INVALID") {
        Object.keys(snapshotsForm.controls).forEach(key => {
          snapshotsForm.controls[key].markAsDirty();
        });
        return false;
      }

      console.log(this.files, this.snapshot.pose, this.snapshot.snapshot_date)
  
      this.spinner.show();
      const userData = sessionStorage.getItem('user');
      const user = JSON.parse(userData);
      let formData = new FormData();
      formData.append("user_id", this.snapshot.user_id);
      formData.append("snapshot_date", this.snapshot.snapshot_date);
      formData.append("pose", this.snapshot.pose);
      formData.append("url", this.files[0]);
  
  
      if (this.id) {
        formData.append("id", this.id);
        let _controllerName = 'nutrition';
        this._snapshots.update(_controllerName, formData).subscribe((res1: any) => {
          this.modalReference.dismiss();
          snapshotsForm.reset();
          this.files = [];
          this.snapshot = {
            user_id: this._userObject.id,
            url: '',
            snapshot_date: ''
          }
          this.getPics();
          this.spinner.hide();
        });
      } else {
        let _controllerName = 'snapshots';
        let _methodName = 'save';
        this._snapshots.save(_controllerName, _methodName, formData).subscribe((cat: any) => {
          this.modalReference.dismiss();
          this.files = [];
          snapshotsForm.reset();
          this.snapshot = {
            user_id: this._userObject.id,
            url: '',
            snapshot_date: ''
          }
          this.getPics();
          this.spinner.hide();
        });
      }
    }
    
    BackToList() {
      this._router.navigate(["/manage/client-management"]);
    }
    
    open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  uploadFile(event: any) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
    }
  }

  deleteAttachment(index: number) {
    this.files.splice(index, 1)
  }

  AddPics(modal: any) {
    this.snapshot = {
      user_id: this._userObject.id,
      url: '',
      snapshot_date: ''
    }
    this.modalReference = this.modalService.open(modal, {
      backdrop: true,
      centered: true,
      size: 'lg'
    })
  }
}
