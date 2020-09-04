import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared-ui-module/login/login.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'student', loadChildren: () =>
      import('./student-module/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', loadChildren: () =>
      import('./admin-module/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
    // otherwise redirect to student
  { path: '', redirectTo: `login`, pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
