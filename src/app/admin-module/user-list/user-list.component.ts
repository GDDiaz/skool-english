import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users = [];
  title = '';
  type = 0;
  constructor(private courseService: CoursesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.type = data.type;
      this.courseService.getUsers(this.type).subscribe(result  => this.users = result, error => console.error(error));
    });

    this.title = (this.type) ? 'Lista de docentes' : 'Lista de estudiantes';
  }

}
