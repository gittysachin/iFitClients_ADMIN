import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html'
})
export class AddVideosComponent implements OnInit {

  files: any = [];
  workout: any = {
    business_owner_id: '',
    category_id: '',
    url: '',
    name: '',
    description: ''
  }
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
