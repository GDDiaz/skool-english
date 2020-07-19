import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../helpers/auth.guard";
import { TimelineComponent } from "./timeline/timeline.component";
import { SlideComponent } from "./slide/slide.component";

const routes: Routes = [
  { path: "", component: TimelineComponent, canActivate: [AuthGuard] },
  { path: "slide/:type", component: SlideComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
