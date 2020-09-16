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
    this.dataSlides = [];
    this._route.paramMap.subscribe((params) => {
      this.unidadId = params.get("idUnidad");
      this.lugarArray = params.get("lugarArray");
      this.studentService.unidadId = this.unidadId;
      this.studentService.slideId = this.lugarArray;
    });

    this.studentService.getUnitById(this.unidadId).subscribe(
      (response) => {
        console.log(this.dataSlides);
        let jsonTemporal = response.slides;
        this.dataSlides = [];
        for (let key in jsonTemporal) {
          this.dataSlides.push(jsonTemporal[key]);
        }
        console.log(this.dataSlides);

        this.dataSlides.sort(function (a, b) {
          if (a.position > b.position) {
            return 1;
          }
          if (a.position < b.position) {
            return -1;
          }
          return 0;
        });

        this.data = this.dataSlides[parseInt(this.lugarArray)].content;
        this.tipo = this.dataSlides[parseInt(this.lugarArray)].type;
        this.actualSlide = parseInt(this.lugarArray);
      },
      (error) => {
        console.log(error);
        if (this.unidadId === "undefined") {
          this._router.navigate(["/student"]);
        }
      },
      () => {
        console.log(this.dataSlides.length);
        this.visitado();
        console.log(this.actualSlide);

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
      course_id: this.dataSlides[this.actualSlide].course_id,
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
    console.log(data);

    console.log(this.actualSlide);

    let json = {
      slide_id: this.dataSlides[this.actualSlide].id,
      status: "completado",
      course_id: this.dataSlides[this.actualSlide].course_id,
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
    console.log(Object.keys(this.dataSlides).length);
    if (this.actualSlide < Object.keys(this.dataSlides).length - 1) {
      this.actualSlide = this.actualSlide + 1;
      this.studentService.slideId = this.actualSlide;
    }
    console.log(this.actualSlide);
    console.log(this.dataSlides);

    if (this.dataSlides[this.actualSlide].status_by_user === "completado") {
      this.actualSlide = this.actualSlide + 1;
      this.studentService.slideId = this.actualSlide;
    }

    if (
      data.action === 1 &&
      this.actualSlide < Object.keys(this.dataSlides).length - 1
    ) {
      console.log("Entro al if");

      this.lugarArray = this.lugarArray;
      this.data = this.dataSlides[this.actualSlide].content;
      this.tipo = this.dataSlides[this.actualSlide].type;
      console.log(this.data);
      this.studentService.unidadId = this.unidadId;
      this.studentService.slideId = this.actualSlide;
    } else {
      console.log("dasdasd");

      this._router.navigate(["/student"]);
    }
  }
}
