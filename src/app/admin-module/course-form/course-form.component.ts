import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FileUploadComponent } from '../../shared-ui-module/file-upload/file-upload.component';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public courseForm = this.fb.group({
    name: ['', Validators.required],
    author: [''],
    video_url: ['']
  });

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }



  onSubmit() {
    this.courseService.newCourse(this.courseForm.value).subscribe(r => {
      this.router.navigate(['/admin/course/content', r.id]);
    }, error => console.error(error));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '60%',
      data: {
        maxSize: 20000000, // 20MB
        accept: 'image/*',
        multiple: '',
        fileDropDisabled: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
