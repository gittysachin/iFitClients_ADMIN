import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddEditUserComponent } from './add-edit-user.component';
import { ClientsComponent } from './clients.component';
import { AddEditClientComponent } from './add-edit-client.component';
import { TrainersComponent } from './trainers.component';
import { AddEditTrainersComponent } from './add-edit-trainers.component';
import { ClientWeighInsComponent } from './client-weigh-ins.component';
import { ProgressPicsComponent } from './progress-pics.component';
import { GoalsComponent } from './goals.component';
import { ActivitiesComponent } from './activities.component';
import { ClientProfileComponent } from './client-profile.component';
import { WorkoutsComponent } from './workouts.component';
import { AddVideosComponent } from './add-videos.component';
import { NutritionsComponent } from './nutritions.component';
import { NutritionCategoriesComponent } from './nutrition-categories.component';
import { WorkoutCategoriesComponent } from './workout-categories.component';
import { SuperUsersComponent } from './super-users.component';
import { AddEditSuperUsersComponent } from './add-edit-super-users.component';
import { LoggedInProfileComponent } from './logged-in-profile.component';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: LoggedInProfileComponent,
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'business-owners',
    component: UsersComponent,
    data: {
      title: 'Business Owners'
    }
  },
  {
    path: 'users',
    component: SuperUsersComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'users/add',
    component: AddEditSuperUsersComponent,
    data: {
      title: 'Add Users'
    }
  },
  {
    path: 'users/edit/:id',
    component: AddEditSuperUsersComponent,
    data: {
      title: 'Edit Users'
    }
  },
  {
    path: 'business-owners/add',
    component: AddEditUserComponent,
    data: {
      title: 'Manage Business Owners'
    }
  },
  {
    path: 'business-owners/edit/:id',
    component: AddEditUserComponent,
    data: {
      title: 'Manage Business Owners'
    }
  },
  {
    path: 'client-management',
    component: ClientsComponent,
    data: {
      title: 'Clients Management'
    }
  },
  {
    path: 'client-management/add',
    component: AddEditClientComponent,
    data: {
      title: 'Clients Management'
    }
  },
  {
    path: 'client-management/edit',
    component: AddEditClientComponent,
    data: {
      title: 'Clients Management'
    }
  },
  {
    path: 'trainers-management',
    component: TrainersComponent,
    data: {
      title: 'Trainers Management'
    }
  },
  {
    path: 'trainers-management/add',
    component: AddEditTrainersComponent,
    data: {
      title: 'Trainers Management'
    }
  },
  {
    path: 'trainers-management/edit/:id',
    component: AddEditTrainersComponent,
    data: {
      title: 'Trainers Management'
    }
  },
  {
    path: 'client-management/weigh-ins',
    component: ClientWeighInsComponent,
    data: {
      title: 'Weigh Ins'
    }
  },
  {
    path: 'client-management/progress-pics',
    component: ProgressPicsComponent,
    data: {
      title: 'Progress Pics'
    }
  },
  {
    path: 'client-management/goals',
    component: GoalsComponent,
    data: {
      title: 'Goals'
    }
  },
  {
    path: 'client-management/activity',
    component: ActivitiesComponent,
    data: {
      title: 'Activity'
    }
  },
  {
    path: 'client-management/profile',
    component: ClientProfileComponent,
    data: {
      title: 'Profile'
    }
  },
  {
    path: 'workout/category',
    component: WorkoutCategoriesComponent,
    data: {
      title: 'Workout Category'
    }
  },
  {
    path: 'workouts',
    component: WorkoutsComponent,
    data: {
      title: 'Workouts'
    }
  },
  {
    path: 'workouts/add',
    component: AddVideosComponent,
    data: {
      title: 'Add Videos'
    }
  },
  {
    path: 'nutrition/category',
    component: NutritionCategoriesComponent,
    data: {
      title: 'Nutrition Category'
    }
  },
  {
    path: 'nutrition',
    component: NutritionsComponent,
    data: {
      title: 'Nutrition'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
