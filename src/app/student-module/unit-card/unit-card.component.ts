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

  constructor(
    private _router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    if (this.positionIcon % 2 === 0) {
      this.positionIconClass = "left";
    } else {
      this.positionIconClass = "right";
    }
    if (this.dataToCard.slides.length > 0) {
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
  click(tipo, posicion) {
    this.studentService.dataLeccion = this.unidades[posicion].content;

    this._router.navigate(["/student/slide/" + tipo]);
  }
}
