import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatIconModule,
  MatButtonModule, MatExpansionModule, MatTooltipModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { CourseContentComponent } from './course-content/course-content.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { UnitVideoFormComponent } from './unit-video-form/unit-video-form.component';
import { TestFormComponent } from './test-form/test-form.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent,
    CourseContentComponent,
    UnitFormComponent,
    UnitVideoFormComponent,
    TestFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),
    MatDialogModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTooltipModule, MatRadioModule, MatCheckboxModule
  ]
})
export class AdminModule { }
