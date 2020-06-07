import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { AuthGuard } from '../helpers/auth.guard';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseContentComponent } from './course-content/course-content.component';


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
    path: 'teachers',
    component: CourseFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'courses' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
