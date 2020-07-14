import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html'
})
export class AddVideosComponent implements OnInit {

  files: any = [];
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  uploadFile(event: any) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }
  }

  goBack() {
    this._router.navigate(["/manage/workouts"]);
  }
}
