import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-slide-pdf",
  templateUrl: "./slide-pdf.component.html",
  styleUrls: ["./slide-pdf.component.scss"],
})
export class SlidePdfComponent implements OnInit {
  @Input() dataSlide: any;
  @Output() nextSlide: EventEmitter<any> = new EventEmitter();
  public srcPdf: string;
  constructor() {}

  ngOnInit(): void {
    this.srcPdf = environment.baseUrl + this.dataSlide.files.path;
    console.log(this.srcPdf);
  }

  nextStep() {
    let data = {
      action: 1,
      dataAnswer: null,
    };
    this.nextSlide.emit(data);
  }
}
