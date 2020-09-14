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
  public fileName;
  public arrayMessages: Array<any>;
  public myFile: any;
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
    console.log(this.myFile);

    if (this.myFile !== undefined && this.myFile !== "") {
      console.log("Entra en el IF");

      this.studentService.saveFile(this.myFile).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.enviarMensaje(this.myFile[0].name);

          if (this.message !== "") {
            this.enviarMensaje(this.message);
          }
        }
      );
    } else {
      console.log("Entra en el ELSE");
      if (this.message !== "") {
        this.enviarMensaje(this.message);
      }
    }
  }

  attach() {
    document.getElementById("subirFile").click();
  }

  onFileChange(event) {
    var fileList = event.target.files;
    console.log(fileList);
    this.myFile = fileList;

    this.fileName = event.target.files[0].name;
  }
  enviarMensaje(mensaje) {
    console.log(mensaje);

    let json = {
      slide_id: this.studentService.slideId,
      unit_id: this.studentService.unidadId,
      course_id: 2,
      messages: mensaje,
      to_user_id: 1,
      parent_id: this.user.user.id,
    };
    this.studentService.sendMessages(json).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.arrayMessages.push({
          from_user_name: this.user.user.name,
          messages: mensaje,
        });
      }
    );
  }
}
