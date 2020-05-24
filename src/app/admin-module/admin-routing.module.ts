import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { AuthGuard } from '../helpers/auth.guard';
import { CourseListComponent } from './course-list/course-list.component';


const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: CourseFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
