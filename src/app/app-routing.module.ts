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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
    // otherwise redirect to student
  { path: '', redirectTo: `student`, pathMatch: 'full' },
  { path: '**', redirectTo: 'student' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
