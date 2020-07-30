import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { WorkoutService } from '../../services/workout/workout.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { UserRequestParams } from '../../models/users/user-request-params';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSearchParams } from '../../models/users/user-search-params';
import * as data from '../../../assets/resources/users.json';
import { HttpClient } from '@angular/common/http';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { SecureAuth } from "../../helpers/secure-auth";
import { process } from '@progress/kendo-data-query';
import { images } from './images';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
  @ViewChild(DataBindingDirective, { static: true }) dataBinding: DataBindingDirective;
  id: any;
  _title: string;
  _userObject: any;
  _userRequestParams: UserRequestParams;
  _lstUsers: any = (data as any).default;
  userSearchParams: UserSearchParams;
  modalReference: any;
  files: any = [];
  itemsPerPage: number;
  workoutVideoChannel: Array<any> = [];
  videoURL: any = '';
  _types: any;
  _video: any;
  public _assigned: any[];
  _secureAuth: SecureAuth;
  public gridData: any[];
  public gridView: any[];

  public mySelection: string[] = [];

  constructor(private modalService: NgbModal,
    private _router: Router,
    private _http: HttpClient,
    private _users: UsersService,
    private _workout: WorkoutService,
    private _activatedRoute: ActivatedRoute,
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
    
    this._userRequestParams = new UserRequestParams();
    this.userSearchParams = new UserSearchParams();
    this.itemsPerPage = this._userRequestParams.PageSize;
    this._secureAuth = new SecureAuth();
    // let sidebarRootElement = document.getElementById("root");
    // sidebarRootElement.style.display = "block";
    // let sidebarChildElement = document.getElementById("child");
    // sidebarChildElement.style.display = "none";
    this._types = [
      { typeId: "40eec394-8d0f-426a-a43a-f4a55e3efea1", type: "Admin" },
      { typeId: "51882a3c-33f9-4ff5-a721-4d1ba86430e2", type: "Trainer" },
      { typeId: "5a9b19d7-09c2-4c88-8254-c19277896160", type: "Client" },
      { typeId: "ae78a41e-f9a7-4bc9-b020-df5239be398f", type: "Super Admin" }
    ];
    this.id = this._activatedRoute.snapshot.params.id;
    this._assigned = [];
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

  getClients() {
    const _controllerName = "users";
    const _methodName = "user/by-type";
    const _type = this._types.find(t => t.type === 'Trainer');
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

  onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }

  AssignWorkout(modal: any, video: any) {
    this.getClients();
    this.getAssigned();
    this._video = video;
    this.modalReference = this.modalService.open(modal, {
      size: 'lg',
      centered: true
    })
  }

  getAssigned() {
    this.mySelection = [];
    const _controllerName = "workout";
    const _methodName = "assigned";
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._workout
        .get(_controllerName, _methodName)
        .subscribe((ut: any) => {
          if(ut && ut.res) {
            this._assigned = [];
            ut.res.map(assigned => {
              this._assigned.push(assigned);
            })
            // console.log(this._assigned)
            this.gridView.map(u => {
              this._assigned.map(a => {
                if(u.id === a.user_id) {
                  this.mySelection.push(u.id);
                }
              })
            })
            // console.log(this.mySelection);
          }
        });
    }
  }

  assignToUsers() { // (usersListForm)
    // if (usersListForm.form.status == "INVALID") {
    //   Object.keys(usersListForm.controls).forEach(key => {
    //     usersListForm.controls[key].markAsDirty();
    //   });
    //   return false;
    // }

    let changed = [];
    this.mySelection.map(userId => {
      changed.push({id: userId, assign: true});
    })

    this.gridView.map(u => {
      let found = false;
      this.mySelection.map(userId => {
        if(u.id === userId) {
          found = true;
        }
      });
      if(!found) {
        changed.push({id: u.id, assign: false});
      }
    })

    let url = this._video.url;

    const user = JSON.parse(sessionStorage.user);
    console.log(user.bownerid, url, changed);

    const _controllerName = "workout";
    const _methodName = "editAssignment"

    if (user) {
      this._workout
        .updateAssignment(_controllerName, _methodName, {business_owner_id: user.bownerid, url, changed})
        .subscribe((ut: any) => {
          console.log(ut)
        })
    }

    // if (this.category.id) {
    //   this.spinner.show();
    //   let _controllerName = 'category';
    //   this.catService.update(_controllerName, this.category).subscribe((cat: any) => {
    //     this.modalReference.dismiss();
    //     usersListForm.reset();
    //     this.category = {
    //       name: "",
    //       id: '',
    //       type: "Nutrition",
    //       business_owner_id: "",
    //       is_active: false
    //     };
    //     this.getAllCategories();
    //     this.spinner.hide();
    //   });
    // } else {
    //   this.spinner.show();
    //   const userData = sessionStorage.getItem('user');
    //   const userid = JSON.parse(userData);
    //   this.category.business_owner_id = userid.id;
    //   let _controllerName = 'category';
    //   this.catService.save(_controllerName, this.category).subscribe((cat: any) => {
    //     this.modalReference.dismiss();
    //     usersListForm.reset();
    //     this.category = {
    //       name: "",
    //       id: '',
    //       type: "Nutrition",
    //       business_owner_id: "",
    //       is_active: false
    //     };
    //     this.getAllCategories();
    //     this.spinner.hide();
    //   });
    // }
  }

  getAllWorkoutVideos() {
    // this._http.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=PL-8fyND0sPmNpAtmAEMQgYCUFxR_ayE8p&key=AIzaSyDGoB0_NkgBZvzWkpRHrLxz2TTOxxIYjUI&maxResults=25`).subscribe((res: any) => {
    //   if (res && res.items && res.items.length > 0) {
    //     let itemsObj = res.items;
    //     for (let i = 0; i < itemsObj.length; i++) {
    //       let item: any = {};
    //       item.publishedAt = itemsObj[i].snippet.publishedAt;
    //       item.title = itemsObj[i].snippet.title;
    //       item.description = itemsObj[i].snippet.description;
    //       item.channelTitle = itemsObj[i].snippet.channelTitle;
    //       item.thumbnails = itemsObj[i].snippet.thumbnails.medium;
    //       item.contentDetails = itemsObj[i].contentDetails;
    //       this.workoutVideoChannel.push(item);
    //       console.log(item)
    //     }
    //   }
    // })

    const _controllerName = "workout";
    const _methodName = "by-category";
    const user = JSON.parse(sessionStorage.user);
    if (user) {
      this._workout
        .getByCategoryId(_controllerName, _methodName, this.id)
        .subscribe((ut: any) => {
          if(ut && ut.res) {
            ut.res.map(workout => {
              let item: any = {};
              let url = workout.url;
              var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
              var match = url.match(regExp);
              let videoId = (match&&match[7].length==11)? match[7] : false;
              item.thumbnails = {};
              item.thumbnails.url = `http://img.youtube.com/vi/${videoId}/0.jpg`;
              item.thumbnails.height = 180;
              item.thumbnails.width = 320;
              item.title = workout.name;
              item.url = url;
              item.contentDetails = workout.description;
              this.workoutVideoChannel.push(item);
            })
          }
        });
    }
  }

  AddNewVideo() {
    this._router.navigate(["/manage/workouts/add"]);
  }

  BackToList() {
    this._router.navigate(["/manage/workout/category"]);
  }

  photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;

    return image[code];
  }

  flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;

    return image[code];
  }
}
