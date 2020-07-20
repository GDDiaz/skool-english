import { NgModule } from "@angular/core";
import { StudentRoutingModule } from "./student-routing.module";
import { TimelineComponent } from "./timeline/timeline.component";
import { CommonModule } from "@angular/common";
import { UnitCardComponent } from "./unit-card/unit-card.component";
import { SlideComponent } from "./slide/slide.component";
import { UrlSafePipe } from "./pipes/url-safe.pipe";
import { SlideContentComponent } from "./slide-content/slide-content.component";
import { SlideVideoComponent } from "./slide-video/slide-video.component";
import { SlideQuizComponent } from "./slide-quiz/slide-quiz.component";
import { SlideActivityComponent } from "./slide-activity/slide-activity.component";
import {
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatExpansionModule,
  MatTooltipModule,
  MatRadioModule,
  MatCheckboxModule,
  MatStepperModule,
} from "@angular/material";

@NgModule({
  declarations: [
    TimelineComponent,
    UnitCardComponent,
    SlideComponent,
    UrlSafePipe,
    SlideContentComponent,
    SlideVideoComponent,
    SlideQuizComponent,
    SlideActivityComponent,
  ],
  imports: [
    StudentRoutingModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
  ],
  providers: [],
})
export class StudentModule {}
