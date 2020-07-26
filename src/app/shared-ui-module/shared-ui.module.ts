import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { MatDialogModule } from "@angular/material";
import { ngfModule, ngf } from "angular-file";
import { SidebarAdminComponent } from "./sidebar-admin/sidebar-admin.component";
import { NavbarAdminComponent } from "./navbar-admin/navbar-admin.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    FileUploadComponent,
    SidebarAdminComponent,
    NavbarAdminComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ngfModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarAdminComponent,
    NavbarAdminComponent,
    FooterComponent,
  ],
  entryComponents: [FileUploadComponent],
})
export class SharedUiModule {}
