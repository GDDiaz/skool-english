import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../helpers/auth.guard";
import { TimelineComponent } from "./timeline/timeline.component";
import { SlideComponent } from "./slide/slide.component";
import { ProfileComponent } from "./profile/profile.component";
import { DragNdropComponent } from "./drag-ndrop/drag-ndrop.component";

const routes: Routes = [
  { path: "", component: TimelineComponent, canActivate: [AuthGuard] },
  {
    path: "slide/:idUnidad/:lugarArray",
    component: SlideComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
