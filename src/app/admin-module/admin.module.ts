import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { CourseContentComponent } from './course-content/course-content.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { UnitVideoFormComponent } from './unit-video-form/unit-video-form.component';

@NgModule({
  declarations: [CourseFormComponent, CourseListComponent, CourseContentComponent, UnitFormComponent, UnitVideoFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatDialogModule, MatIconModule, MatButtonModule, MatExpansionModule, MatTooltipModule
  ]
})
export class AdminModule { }
