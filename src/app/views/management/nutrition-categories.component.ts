import { Component, OnInit, ViewChild } from '@angular/core';
import { Nutrition } from './nutrition-categories';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../services/category/categories.service';
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nutrition-categories',
  templateUrl: './nutrition-categories.component.html'
})
export class NutritionCategoriesComponent implements OnInit {
  @ViewChild("form", { static: false }) categoryForm: NgForm;
  public nutritions = [];
  _userObject: any;
  modalReference: any;
  itemToDelete: any;
  category: any = {
    name: "",
    id: '',
    type: "Nutrition",
    business_owner_id: "",
    is_active: true
  };
  modalTitle: string;
  constructor(
    private _router: Router,
    private modalService: NgbModal,
    private catService: CategoriesService,
    private spinner: NgxSpinnerService,
  ) {
    const selectedClient = localStorage.getItem('selectedclient');
    const parsedClientJson = JSON.parse(selectedClient);
    if (parsedClientJson) {
      let obj = atob(parsedClientJson);
      this._userObject = JSON.parse(obj);
      let sidebarRootElement = document.getElementById('root');
      sidebarRootElement.style.display = 'block';
      let sidebarChildElement = document.getElementById('child');
      sidebarChildElement.style.display = 'none';
    }
    let _controllerName = 'category?type=nutrition';
    this.getAll();
  }
  ngOnInit() { }

  showNutrition(obj: any) {
    this._router.navigate(["/manage/nutrition"], {
      queryParams: { catid: obj.id }
    });
  }

  getAll() {
    let _controllerName = 'category?type=nutrition';
    this.catService.get(_controllerName).subscribe((cat: any) => {
      this.nutritions = cat.res;
    });
  }

  AddNutritionCategory(modal: any) {
    this.modalTitle = 'Add';
    this.category = {
      name: "",
      id: '',
      type: "Nutrition",
      business_owner_id: "",
      is_active: true
    };
    this.modalReference = this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
  }

  editNutritionCategory(modal: any, id: any) {
    let _controllerName = 'category';
    this.modalTitle = 'Edit';
    this.catService.getById(_controllerName, id).subscribe((cat: any) => {
      this.category = cat.res;
      this.modalReference = this.modalService.open(modal, {
        size: 'lg',
        centered: true
      })
    })
  }

  addCategory(categoryForm, modal) {
    if (categoryForm.form.status == "INVALID") {
      Object.keys(categoryForm.controls).forEach(key => {
        categoryForm.controls[key].markAsDirty();
      });
      return false;
    }
    if (this.category.id) {
      this.spinner.show();
      let _controllerName = 'category';
      this.catService.update(_controllerName, this.category).subscribe((cat: any) => {
        this.modalReference.dismiss();
        categoryForm.reset();
        this.category = {
          name: "",
          id: '',
          type: "nutrition",
          business_owner_id: "",
          is_active: false
        };
        this.getAll();
        this.spinner.hide();
      });
    } else {
      this.spinner.show();
      const userData = sessionStorage.getItem('user');
      const userid = JSON.parse(userData);
      this.category.business_owner_id = userid.bownerid;
      let _controllerName = 'category';
      this.catService.save(_controllerName, this.category).subscribe((cat: any) => {
        this.modalReference.dismiss();
        categoryForm.reset();
        this.category = {
          name: "",
          id: '',
          type: "nutrition",
          business_owner_id: "",
          is_active: false
        };
        this.getAll();
        this.spinner.hide();
      });
    }
  }

  deleteConfirmation(modal: any, itemToDelete: any) {
    this.modalReference = this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
    this.itemToDelete = itemToDelete;
  }

  deleteCategory() {
    this.spinner.show();
    let _controllerName = 'category';
    let obj = {
      "id": this.itemToDelete.id,
      "name": this.itemToDelete.name,
      "type": this.itemToDelete.type,
      "is_active": false,
      "business_owner_id": this.itemToDelete.business_owner_id
    }

    this.catService.update(_controllerName, obj).subscribe((cat: any) => {
      this.modalReference.dismiss();
      this.spinner.hide();
      this.getAll();
    });
  }
}
