import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NutritionService } from '../../services/nutritions/nutritions.service';
import { NutritionList } from '../../../assets/resources/nutritions-list';
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html'
})
export class NutritionsComponent implements OnInit {

  @ViewChild("form", { static: false }) nutritionsForm: NgForm;

  id: any;
  _title: string;
  _decryptedUser: any;
  _userObject: any
  nutritionsData = [];
  public _albums: Array < any > = [];
  files: any = [];
  nutritions: any = {
    business_owner_id: '',
    category_id: '',
    url: '',
    name: '',
    description: ''
  }
  modalReference: any;
  CatID: any;
  formData = new FormData();
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private nutService: NutritionService,
    private _lightbox: Lightbox,
    private spinner: NgxSpinnerService,
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
    this.CatID = this._activatedRoute.snapshot.queryParamMap.get("catid");
    this.getAll();
  }

  ngOnInit() {}

  getAll() {
    let _controllerName = 'nutrition';
    let obj = {
      "pageNo": 1,
      "pageSize": 10,
      "category_id": this.CatID
    }
    this.nutService.get(_controllerName, obj).subscribe((cat: any) => {
      this.nutritionsData = cat.res.results;
    });
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  AddNew(modal: any) {
    this.modalReference = this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
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

  SaveNutritions(nutritionsForm, model) {
    if (nutritionsForm.form.status == "INVALID") {
      Object.keys(nutritionsForm.controls).forEach(key => {
        nutritionsForm.controls[key].markAsDirty();
      });
      return false;
    }

    this.spinner.show();
    const userData = sessionStorage.getItem('user');
    const userid = JSON.parse(userData);
    this.nutritions.business_owner_id = userid.id;
    this.nutritions.category_id = this.CatID;

    this.formData.append("business_owner_id", userid.id);
    this.formData.append("category_id", this.CatID);
    this.formData.append("name", this.nutritions.name);
    this.formData.append("description", this.nutritions.description);
    this.formData.append("url", this.files[0]);


    if (this.id) {
      this.formData.append("id", this.id);
      let _controllerName = 'nutrition';
      this.nutService.update(_controllerName, this.formData).subscribe((res1: any) => {
        this.modalReference.dismiss();
        nutritionsForm.reset();
        this.nutritions = {
          business_owner_id: '',
          category_id: '',
          url: '',
          name: '',
          description: ''
        };
        this.getAll();
        this.spinner.hide();
      });
    } else {
      let _controllerName = 'nutrition/save';
      this.nutService.save(_controllerName, this.formData).subscribe((cat: any) => {
        this.modalReference.dismiss();
        nutritionsForm.reset();
        this.nutritions = {
          business_owner_id: '',
          category_id: '',
          url: '',
          name: '',
          description: ''
        };
        this.getAll();
        this.spinner.hide();
      });
    }
  }

  BackToList() {
    this._router.navigate(["/manage/nutrition/category"]);
  }
}
