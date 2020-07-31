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
  public unidadId: string;
  public data: any;
  public lugarArray: string;
  public dataSlides: Array<any>;
  public actualSlide: number;
  constructor(
    private _route: ActivatedRoute,
    private studentService: StudentService,
    private _router: Router
  ) {
    this._route.paramMap.subscribe((params) => {
      this.unidadId = params.get("idUnidad");
      this.lugarArray = params.get("lugarArray");
    });

    this.studentService.getUnitById(this.unidadId).subscribe(
      (response) => {
        console.log(response);

        this.dataSlides = response.slides;

        this.data = this.dataSlides[parseInt(this.lugarArray)].content;
        console.log(this.data);

        this.tipo = response.slides[parseInt(this.lugarArray)].type;
        this.actualSlide = parseInt(this.lugarArray);
      },
      (error) => {
        console.log(error);
        if (this.unidadId === "undefined") {
          this._router.navigate(["/student"]);
        }
      },
      () => {
        this.visitado();
        if (this.data === undefined) {
          console.log("undefined");

          this._router.navigate(["/student"]);
        }
      }
    );
  }
  visitado() {
    let json = {
      slide_id: this.dataSlides[this.actualSlide].id,
      status: "visitado",
      course_id: 3,
      unit_id: this.dataSlides[this.actualSlide].unit_id,
      response_user: null,
    };
    console.log(json);
    this.studentService.saveAnswer(json).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
  nextSlide(data) {
    let json = {
      slide_id: this.dataSlides[this.actualSlide].id,
      status: "completado",
      course_id: 3,
      unit_id: this.dataSlides[this.actualSlide].unit_id,
      response_user: JSON.stringify(data.dataAnswer),
    };
    console.log(json);
    this.studentService.saveAnswer(json).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.actualSlide = this.actualSlide + 1;
    if (this.dataSlides[this.actualSlide].status_by_user === "completado") {
      this.actualSlide = this.actualSlide + 1;
    }

    if (
      data.action === 1 &&
      this.actualSlide < Object.keys(this.dataSlides).length
    ) {
      this.lugarArray = this.lugarArray;
      this.data = this.dataSlides[this.actualSlide].content;
      this.tipo = this.dataSlides[this.actualSlide].type;
      console.log(this.data);
    } else {
      this._router.navigate(["/student"]);
    }
  }
}
