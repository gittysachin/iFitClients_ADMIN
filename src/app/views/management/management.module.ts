import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ManagementRoutingModule } from './management-routing.module';
import { AddEditUserComponent } from './add-edit-user.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../helpers/ngb-date-custom-parser-formatter';
import { OnlynumberDirective } from '../../directives/numbers-only';
import { MustMatchDirective } from '../../directives/must-match.directive';
import { AgGridModule } from 'ag-grid-angular';
import { ClientsComponent } from './clients.component';
import { AddEditClientComponent } from './add-edit-client.component';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { RatingComponent } from './rating.component';
import 'hammerjs';
import { TrainersComponent } from './trainers.component';
import { AddEditTrainersComponent } from './add-edit-trainers.component';
import { ClientWeighInsComponent } from './client-weigh-ins.component';
import { ProgressPicsComponent } from './progress-pics.component';
import { GoalsComponent } from './goals.component';
import { ActivitiesComponent } from './activities.component';
import { ClientProfileComponent } from './client-profile.component';
import { LightboxModule } from 'ngx-lightbox';
import { WorkoutsComponent } from './workouts.component';
import { DragDropDirective } from '../../directives/dropzone';
import { HttpClientModule } from '@angular/common/http';
import { AddVideosComponent } from './add-videos.component';
import { NutritionsComponent } from './nutritions.component';
import { NutritionCategoriesComponent } from './nutrition-categories.component';
import { WorkoutCategoriesComponent } from './workout-categories.component';
import { SuperUsersComponent } from './super-users.component';
import { AddEditSuperUsersComponent } from './add-edit-super-users.component';
import { LoggedInProfileComponent } from './logged-in-profile.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgxSpinnerModule } from "ngx-spinner";
// import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent,
    OnlynumberDirective,
    MustMatchDirective,
    ClientsComponent,
    AddEditClientComponent,
    RatingComponent,
    TrainersComponent,
    AddEditTrainersComponent,
    ClientWeighInsComponent,
    ProgressPicsComponent,
    GoalsComponent,
    ActivitiesComponent,
    ClientProfileComponent,
    WorkoutsComponent,
    DragDropDirective,
    AddVideosComponent,
    NutritionsComponent,
    NutritionCategoriesComponent,
    WorkoutCategoriesComponent,
    SuperUsersComponent,
    AddEditSuperUsersComponent,
    LoggedInProfileComponent,
    // JwPaginationComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([]),
    GridModule,
    ChartsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    LightboxModule,
    HttpClientModule,
    AngularMyDatePickerModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class ManagementModule { }
