import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public name: string;
  public id: string;
  public cursoName: string;
  public photo: string;

  constructor(private router: Router) {
    this.name = "Lorena Torres";
    this.id = "93248497";
    this.cursoName = "EASY ENGLISH";
    this.getUser();
  }

  ngOnInit(): void {}

  getUser() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
    this.name = user.user.name;
    this.id = user.user.id;
    this.photo = user.user.photo;
  }
}
