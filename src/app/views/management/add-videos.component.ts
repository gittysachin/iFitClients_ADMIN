import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NutritionService } from '../../services/nutritions/nutritions.service';
import { NutritionList } from '../../../assets/resources/nutritions-list';
import { NgForm } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html'
})
export class AddVideosComponent implements OnInit {

  files: any = [];

  constructor(private _router: Router) {}

  ngOnInit() {}

  uploadFile(event: any) {
    for (let index = 0; index < event.length; index++) {
      if (event[index].type == 'video/mp4' || event[index].type == 'video/mov') {
        const element = event[index];
        this.files.push(element)
      }
    }
  }

  deleteAttachment(index: number) {
    this.files.splice(index, 1)
  }

  goBack() {
    this._router.navigate(["/manage/workouts"]);
  }
}
