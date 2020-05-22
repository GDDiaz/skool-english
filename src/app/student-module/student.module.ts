
import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { TimelineComponent } from './timeline/timeline.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    StudentRoutingModule,
    CommonModule,
  ],
  providers: [],
})
export class StudentModule { }
