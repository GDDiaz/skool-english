import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-unit-card",
  templateUrl: "./unit-card.component.html",
  styleUrls: ["./unit-card.component.scss"],
})
export class UnitCardComponent implements OnInit {
  @Input() dataToCard: any;
  @Input() positionIcon: number;
  public positionIconClass: string;
  public unidades: Array<any>;
  public progress: number;

  constructor(
    private _router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    console.log(this.dataToCard);

    this.calcProgress();

    if (this.positionIcon % 2 === 0) {
      this.positionIconClass = "left";
    } else {
      this.positionIconClass = "right";
    }
    if (this.dataToCard.slides.length > 0) {
      this.dataToCard.slides.sort(function (a, b) {
        if (a.position > b.position) {
          return 1;
        }
        if (a.position < b.position) {
          return -1;
        }
        return 0;
      });
      this.unidades = this.dataToCard.slides;
      for (let index = 0; index < this.unidades.length; index++) {
        this.unidades[index].content = JSON.parse(this.unidades[index].content);
      }
    } else {
      this.unidades = [
        {
          type: "no data",
          content: { name: "Example1" },
        },
        {
          type: "no data",
          content: { name: "Example1" },
        },
        {
          type: "no data",
          content: { name: "Example1" },
        },
        {
          type: "no data",
          content: { name: "Example1" },
        },
      ];
    }
  }

  click(tipo, posicion, status) {
    /* if (status !== "completado") {
      this._router.navigate([
        "/student/slide/" + this.unidades[posicion].unit_id + "/" + posicion,
      ]);
    } */
    console.log(tipo);

    this._router.navigate([
      "/student/slide/" + this.unidades[posicion].unit_id + "/" + posicion,
    ]);
  }
  calcProgress() {
    let completados = 0;
    for (let index = 0; index < this.dataToCard.slides.length; index++) {
      if (this.dataToCard.slides[index].status_by_user === "completado") {
        completados = completados + 1;
      }
    }
    this.progress = (completados / this.dataToCard.slides.length) * 100;
    if (completados === 0) {
      this.progress = 0;
    }
  }
}
