import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.scss"],
})
export class SlideComponent implements OnInit {
  public tipo: string;
  public data: any;
  constructor(
    private _route: ActivatedRoute,
    private studentService: StudentService,
    private _router: Router
  ) {
    this._route.paramMap.subscribe((params) => {
      this.tipo = params.get("type");
    });
    this.data = this.studentService.dataLeccion;
  }

  ngOnInit(): void {
    if (this.data === undefined) {
      this._router.navigate(["/student"]);
    }
  }
}
