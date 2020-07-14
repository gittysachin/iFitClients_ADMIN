import { Component, OnInit } from '@angular/core';
import { UserMaster } from '../../models/users/user-master';
import { SecureAuth } from '../../helpers/secure-auth';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { ProgressPics } from '../../../assets/resources/progress';
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
  _userObject: any
  public _albums: Array<any> = [];
  files: any = [];
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,    
    private _userSevice: UsersService,
    private _lightbox: Lightbox,
    private modalService: NgbModal) {
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
    for (let i = 0; i < ProgressPics.length; i++) {
      const src = ProgressPics[i].img_url;
      const caption = ProgressPics[i].id;
      const thumb = ProgressPics[i].img_url;
      const date = ProgressPics[i].date
      const album = {
        src: src,
        caption: caption,
        thumb: thumb,
        date: date
      };
      this._albums.push(album);
    }

  }

  ngOnInit() {
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
      this.files.push(element.name)
    }
  }

  deleteAttachment(index: number) {
    this.files.splice(index, 1)
  }

  AddPics(modal: any) {
    this.modalService.open(modal, {
      backdrop: true,
      centered: true,
      size: 'lg'
    })
  }
}
