import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NutritionService } from '../../services/nutritions/nutritions.service';
import { NutritionList } from '../../../assets/resources/nutritions-list';
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { images } from './images';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html'
})
export class NutritionsComponent implements OnInit {

  @ViewChild("form", { static: false }) nutritionsForm: NgForm;

  id: any;
  _title: string;
  _decryptedUser: any;
  _userObject: any;
  _image: any;
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
  _types: any;
  CatID: any;
  formData = new FormData();
  public gridData: any[];
  public gridView: any[];
  public mySelection: string[] = [];

  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private nutService: NutritionService,
    private _lightbox: Lightbox,
    private spinner: NgxSpinnerService,
    private _users: UsersService,
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
    this._types = [
      { typeId: "40eec394-8d0f-426a-a43a-f4a55e3efea1", type: "Admin" },
      { typeId: "51882a3c-33f9-4ff5-a721-4d1ba86430e2", type: "Trainer" },
      { typeId: "5a9b19d7-09c2-4c88-8254-c19277896160", type: "Client" },
      { typeId: "ae78a41e-f9a7-4bc9-b020-df5239be398f", type: "Super Admin" }
    ];
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
      console.log(this.nutritionsData)
    });
  }

  AssignNutrition(modal: any, image: any) {
    this._image = image;
    this.getClients();
    this.getAssigned();
    this.modalReference = this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
  }

  getClients() {
    this.gridView = [];
    const _controllerName = "users";
    const _methodName = "user/by-type";
    const _type = this._types.find(t => t.type === 'Client');
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._users
        .getByType(_controllerName, _methodName, _type.typeId)
        .subscribe((ut: any) => {
          if(ut && ut.res) {
            ut.res.map(data => { data.full_name = data.first_name + " " + data.last_name; data.country = "US"; data.is_online = true; data.address = data.address1 + " " + data.address2; data.rating = 3; })
            // this.gridView = ut.res;
            this.gridView = ut.res;
          }
        });
    }
  }

  getAssigned() {
    // this.mySelection = [];
    // const _controllerName = "workout";
    // const _methodName = "assigned";
    // const user = JSON.parse(sessionStorage.user);
    // console.log(this._video.workout.id)
    // if (user) {
    //   this._workout
    //     .getByWorkoutId(_controllerName, _methodName, this._video.workout.id)
    //     .subscribe((ut: any) => {
    //       if(ut && ut.res) {
    //         this._assigned = [];
    //         ut.res.map(assigned => {
    //           this._assigned.push(assigned);
    //         })
    //         this.gridView.map(u => {
    //           this._assigned.map(a => {
    //             if(u.id === a.user_id) {
    //               this.mySelection.push(u.id);
    //             }
    //           })
    //         })
    //         // console.log(this.mySelection);
    //       }
    //     });
    // }
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    this._lightbox.close();
  }

  photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;

    return image[code];
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
