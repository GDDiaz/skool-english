import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { AuthGuard } from '../helpers/auth.guard';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserShowComponent } from './user-show/user-show.component';


const routes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'courses/new',
    component: CourseFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course/content/:id',
    component: CourseContentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students/new',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      type: 0
    }
  },
  {
    path: 'students/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      type: 0
    }
  },
  {
    path: 'students/show/:id',
    component: UserShowComponent,
    canActivate: [AuthGuard],
    data: {
      type: 0
    }
  },
  {
    path: 'students',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      type: 0
    }
  },
  {
    path: 'teachers',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      type: 1
    }
  },
  {
    path: 'teachers/new',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      type: 1
    }
  },
  {
    path: 'teachers/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      type: 1
    }
  },
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
