import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NutritionList } from '../../../assets/resources/nutritions-list';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html'
})
export class NutritionsComponent implements OnInit {

  id: any;
  _title: string;
  _decryptedUser: any;
  _userObject: any
  public _albums: Array<any> = [];
  files: any = [];
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _lightbox: Lightbox,
    private modalService: NgbModal) {
    const selectedClient = localStorage.getItem('selectedclient');
    const parsedClientJson = JSON.parse(selectedClient);
    if (parsedClientJson) {
      let obj = atob(parsedClientJson);
      this._userObject = JSON.parse(obj);
      let sidebarRootElement = document.getElementById('root');
      sidebarRootElement.style.display = 'block';
      let sidebarChildElement = document.getElementById('child');
      sidebarChildElement.style.display = 'none';
    } else {
      this._title = "Add";
    }
    for (let i = 0; i < NutritionList.length; i++) {
      const src = NutritionList[i].img_url;
      const caption = NutritionList[i].name;
      const thumb = NutritionList[i].img_url;
      const date = NutritionList[i].name
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

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  AddNew(modal: any) {
    this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
  }

  uploadFile(event: any) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }

  BackToList() {
    this._router.navigate(["/manage/nutrition/category"]);
  }
}
