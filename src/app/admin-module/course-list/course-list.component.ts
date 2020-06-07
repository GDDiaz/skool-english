import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  public courses: any[];
  constructor(private courseService: CoursesService) { }

  ngOnInit() {
    this.courseService.getAllCourse().subscribe(result  => this.courses = result);
  }

}
