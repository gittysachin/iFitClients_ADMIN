import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NutritionService } from '../../services/nutritions/nutritions.service';
import { NutritionList } from '../../../assets/resources/nutritions-list';
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Workouts } from '../../models/workouts/workouts';
import { WorkoutService } from '../../services/workout/workout.service';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html'
})
export class AddVideosComponent implements OnInit {
  categoryId: any;
  files: any = [];
  workouts: Workouts;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private service: WorkoutService) {
    this.categoryId = this._activatedRoute.snapshot.params.id;
    this.workouts = new Workouts();
  }

  ngOnInit() {
  }

  uploadFile(event: any) {
    for (let index = 0; index < event.length; index++) {
      if (event[index].type == 'video/mp4' || event[index].type == 'video/mov') {
        const element = event[index];
        this.files.push(element)
      }
    }
  }

  saveNewWorkout() {
    let controllerName = 'workout/save';
    const userData = sessionStorage.getItem('user');
    const user = JSON.parse(userData);
    let formData = new FormData();
    formData.append("business_owner_id", user.bownerid);
    formData.append("category_id", this.categoryId);
    formData.append("name", this.workouts.name);
    formData.append("description", this.workouts.description);
    if (this.files && this.files.length > 0) {
      formData.append("url", this.files[0]);
    } else {
      formData.append("url", this.workouts.url);
    }
    this.service.save(controllerName, formData).subscribe((res: any) => {
      if (res) {
        setTimeout(() => {
          this.goBack();
        }, 3000);
      }
    })
  }

  deleteAttachment(index: number) {
    this.files.splice(index, 1)
  }

  goBack() {
    this._router.navigate([`/manage/workouts/${this.categoryId}`]);
  }
}
