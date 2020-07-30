import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatIconModule, MatMenuModule,
  MatButtonModule, MatExpansionModule, MatTooltipModule, MatRadioModule, MatCheckboxModule, MatStepperModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CourseContentComponent } from './course-content/course-content.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { UnitVideoFormComponent } from './unit-video-form/unit-video-form.component';
import { TestFormComponent } from './test-form/test-form.component';
import { QuillModule } from 'ngx-quill';
import { ContentFormComponent } from './content-form/content-form.component';
import { ShowSlideComponent } from '../student-module/show-slide/show-slide.component';
import { UploadFileWidgetComponent } from './upload-file-widget/upload-file-widget.component';
import { ngfModule } from 'angular-file';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ActivityChoiceFormComponent } from './activity-choice-form/activity-choice-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserShowComponent } from './user-show/user-show.component';
import { AttachFormComponent } from './attach-form/attach-form.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent,
    CourseContentComponent,
    UnitFormComponent,
    UnitVideoFormComponent,
    TestFormComponent,
    ContentFormComponent,
    ShowSlideComponent,
    UploadFileWidgetComponent,
    ActivityFormComponent,
    ActivityChoiceFormComponent,
    UserFormComponent,
    UserListComponent,
    UserShowComponent,
    AttachFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),
    ngfModule,
    PdfViewerModule,
    MatDialogModule, MatIconModule, MatButtonModule,
    MatExpansionModule, MatTooltipModule, MatRadioModule,
    MatCheckboxModule, MatStepperModule, MatMenuModule, DragDropModule
  ]
})
export class AdminModule { }
