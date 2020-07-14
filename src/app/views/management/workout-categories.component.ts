import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from './workout-categories';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../services/category/categories.service';

@Component({
  selector: 'app-workout-categories',
  templateUrl: './workout-categories.component.html'
})
export class WorkoutCategoriesComponent implements OnInit {

  public workout: any[];
  _userObject: any;
  itemToDelete: any;
  constructor(private _router: Router, private modalService: NgbModal, private service: CategoriesService) {
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
    this.workout = Workout;
  }

  ngOnInit() {
  }

  getAllCategories() {

  }

  showWorkout(obj: any) {
    this._router.navigate(["/manage/workouts"]);
  }

  AddWorkoutCategory(modal: any) {
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
