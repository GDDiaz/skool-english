import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FileUploadComponent } from '../../shared-ui-module/file-upload/file-upload.component';
import { CoursesService } from '../services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public courseId = null;
  public title;
  public action = 'new';
  public courseForm = this.fb.group({
    name: ['', Validators.required],
    author: [''],
    video_url: ['']
  });
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.courseId = params.params.id;
        this.title =  'Editar curso' ;
        this.action = 'edit';
        this.courseService.getCourseById(this.courseId).subscribe(
          result => this.courseForm.patchValue(result) ,
          error  => console.error(error)
        );
      } else {
        this.title = 'Nuevo curso';
      }
  }, error => console.error(error));
  }

  onSubmit() {
    this.loading = true;
    if (this.action === 'new') {
      this.courseService.newCourse(this.courseForm.value).subscribe(r => {
        this.router.navigate(['/admin/course/content', r.id]);
      }, error => console.error(error));
    } else {
      this.courseService.editCourse(this.courseId, this.courseForm.value).subscribe(r => {
        this.router.navigate(['/admin/course/content', r.id]);
      }, error => console.error(error));
    }
    
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
