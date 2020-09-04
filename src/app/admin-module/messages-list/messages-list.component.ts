import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  messages = [];
  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    this.courseService.getMessages().subscribe(
      response => this.messages = response,
      error => console.error(error)
    )
  }

}
