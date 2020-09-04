import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { AuthGuard } from '../helpers/auth.guard';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserShowComponent } from './user-show/user-show.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuardService } from '../helpers/admin.guard.service';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesShowComponent } from './messages-show/messages-show.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuardService]
  },
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [AuthGuard,AdminGuardService]
  },
  {
    path: 'courses/new',
    component: CourseFormComponent,
    canActivate: [AuthGuard,AdminGuardService]
  },
  {
    path: 'courses/edit/:id',
    component: CourseFormComponent,
    canActivate: [AuthGuard, AdminGuardService]
  },
  {
    path: 'course/content/:id',
    component: CourseContentComponent,
    canActivate: [AuthGuard,AdminGuardService]
  },
  {
    path: 'students/new',
    component: UserFormComponent,
    canActivate: [AuthGuard,AdminGuardService],
    data: {
      type: 0
    }
  },
  {
    path: 'students/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminGuardService],
    data: {
      type: 0
    }
  },
  {
    path: 'students/show/:id',
    component: UserShowComponent,
    canActivate: [AuthGuard, AdminGuardService],
    data: {
      type: 0
    }
  },
  {
    path: 'students',
    component: UserListComponent,
    canActivate: [AuthGuard, AdminGuardService],
    data: {
      type: 0
    }
  },
  {
    path: 'teachers',
    component: UserListComponent,
    canActivate: [AuthGuard, AdminGuardService],
    data: {
      type: 1
    }
  },
  {
    path: 'teachers/new',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminGuardService],
    data: {
      type: 1
    }
  },
  {
    path: 'teachers/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthGuard, AdminGuardService],
    data: {
      type: 1
    }
  },
  {
    path: 'messages',
    component: MessagesListComponent,
    canActivate: [AuthGuard, AdminGuardService]
  },
  {
    path: 'messages/show/:id',
    component: MessagesShowComponent,
    canActivate: [AuthGuard, AdminGuardService],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
