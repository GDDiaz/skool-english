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
import { NgCircleProgressModule } from "ng-circle-progress";
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
  MatSelectModule,
  MatFormFieldModule,
} from "@angular/material";
import { FormsModule } from "@angular/forms";
import { AudioButtonComponent } from "./audio-button/audio-button.component";
import { ProfileComponent } from "./profile/profile.component";
import { SharedUiModule } from "../shared-ui-module/shared-ui.module";
import { SlidePdfComponent } from "./slide-pdf/slide-pdf.component";
import { PdfViewerModule } from "ng2-pdf-viewer";

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
    AudioButtonComponent,
    ProfileComponent,
    SlidePdfComponent,
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
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    PdfViewerModule,
    SharedUiModule,
    NgCircleProgressModule.forRoot({
      backgroundPadding: 7,
      space: -2,
      outerStrokeGradient: true,
      outerStrokeColor: "#ec4e55",
      outerStrokeGradientStopColor: "#283790",
      innerStrokeColor: "#e7e8ea",
      title: ["working", "in", "progress"],
      animateTitle: false,
      animationDuration: 1000,
      showSubtitle: false,
      showUnits: false,
      clockwise: false,
    }),
  ],
  providers: [],
})
export class StudentModule {}
