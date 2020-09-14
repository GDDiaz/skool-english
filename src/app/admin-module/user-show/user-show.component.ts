import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {
  userId: any;
  user: User;
  courses = [];
  disableButton = false;
  form;
  loading = false;

  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      courses: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.userId = params.params.id;
        this.courseService.getUserById(this.userId).subscribe(response => {
          if (response) {
            this.user = response;
          }
        });
      }
    }, error => console.error(error));
  }

  getCourses() {
    this.courseService.getAllCourse().subscribe((result: any)  => {
      this.courses = result;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < result.length; i++) {
        let value = false;
        this.user.my_courses.forEach(element => {
          if (element.id === result[i].id) {
            value = true;
          }
        });
        this.coursesFormArray.push(new FormControl(value));
      }
    }, error => console.error(error));
  }


  get coursesFormArray() {
    return this.form.controls.courses as FormArray;
  }

  addCourses() {
    this.getCourses();
  }

  delete() {
    this.courseService.deleteUser(this.userId).subscribe(
      r => {
        this.router.navigate(['/admin/students']);
      },
      e => console.error(e)
    );
  }

  onSubmit() {
    this.loading = true;
    const selectedCoursesIds = this.form.value.courses
    .map((checked, i) => checked ? this.courses[i].id : null)
    .filter(v => v !== null);
    if (selectedCoursesIds.length > 0) {
      this.courseService.addCourse(this.userId, {courses: selectedCoursesIds}).subscribe(
        response => {
          this.user = response;
          this.loading = false;
        },
        error => {
          console.error(error);
        }
        );
    }
  }

  sanitizerUrl(url, addApiUrl) {
    if (addApiUrl) {
      url = `${environment.baseUrl}/${url}` ;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
