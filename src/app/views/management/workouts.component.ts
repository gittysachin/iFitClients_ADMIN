import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {

  id: any;
  _title: string;
  _userObject: any
  files: any = [];
  workoutVideoChannel: Array<any> = [];
  videoURL: any = '';

  constructor(private modalService: NgbModal,
    private _router: Router,
    private _http: HttpClient,
    private sanitizer: DomSanitizer) {
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
  }

  ngOnInit() {
    this.getAllWorkoutVideos();
  }

  open(index: any, model: any) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.workoutVideoChannel[index].contentDetails.videoId}`);
    this.modalService.open(model, {
      size: 'xl',
      centered: true
    });
  }

  getAllWorkoutVideos() {
    this._http.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=PL-8fyND0sPmNpAtmAEMQgYCUFxR_ayE8p&key=AIzaSyDGoB0_NkgBZvzWkpRHrLxz2TTOxxIYjUI&maxResults=25`).subscribe((res: any) => {
      if (res && res.items && res.items.length > 0) {
        let itemsObj = res.items;
        for (let i = 0; i < itemsObj.length; i++) {
          let item: any = {};
          item.publishedAt = itemsObj[i].snippet.publishedAt;
          item.title = itemsObj[i].snippet.title;
          item.description = itemsObj[i].snippet.description;
          item.channelTitle = itemsObj[i].snippet.channelTitle;
          item.thumbnails = itemsObj[i].snippet.thumbnails.medium;
          item.contentDetails = itemsObj[i].contentDetails;
          this.workoutVideoChannel.push(item);
        }
      }
    })
  }

  AddNewVideo() {
    this._router.navigate(["/manage/workouts/add"]);
  }

  BackToList() {
    this._router.navigate(["/manage/workout/category"]);
  }
}
