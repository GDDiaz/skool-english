import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public name: string;
  public id: string;
  public cursoName: string;

  constructor() {
    this.name = "Lorena Torres";
    this.id = "93248497";
    this.cursoName = "EASY ENGLISH";
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
    /* this.name = user.name;
    this.id = user.id; */
  }
}
