import { Component, OnInit } from '@angular/core';
import { Nutrition } from './nutrition-categories';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-nutrition-categories',
  templateUrl: './nutrition-categories.component.html'
})
export class NutritionCategoriesComponent implements OnInit {

  public nutritions: any[];
  _userObject: any;
  itemToDelete: any;
  constructor(private _router: Router, private modalService: NgbModal) {
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
    this.nutritions = Nutrition;
  }
  ngOnInit() {
  }

  showNutrition(obj: any) {
    this._router.navigate(["/manage/nutrition"]);
  }

  AddNutritionCategory(modal: any) {
    this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
  }

  deleteConfirmation(modal: any, itemToDelete: any) {
    this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
    this.itemToDelete = itemToDelete;
  }
}
