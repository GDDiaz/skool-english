import { Component, OnInit } from "@angular/core";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"],
})
export class MessagesComponent implements OnInit {
  public message: string;
  public files: any;
  public user;
  public name;
  public arrayMessages: Array<any>;
  constructor(private studentService: StudentService) {
    this.arrayMessages = [];
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.studentService.getMessages(2).subscribe(
      (response) => {
        console.log(response);
        this.arrayMessages = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    console.log(this.user);
    this.name = this.user.user.name;
    console.log(this.name);
  }
  enviar() {
    /*  console.log(this.files[0]); */
    /* let json = {
      slide_id: this.studentService.slideId,
      unit_id: this.studentService.unidadId,
      course_id: 2,
      messages: this.message,
      to_user_id: 1,
      parent_id: this.user.user.id,
    };
    this.studentService.sendMessages(json).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    ); */
  }
}
