import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-slide-video",
  templateUrl: "./slide-video.component.html",
  styleUrls: ["./slide-video.component.scss"],
})
export class SlideVideoComponent implements OnInit {
  public video: any;
  @Input() dataSlide: any;
  @Output() nextSlide: EventEmitter<any> = new EventEmitter();
  constructor(private studentService: StudentService) {
    console.log(this.dataSlide);
  }

  ngOnInit(): void {
    this.video = this.studentService.createIframe(this.dataSlide.video_url);
  }
  nextStep() {
    console.log("asdasdasd");

    let data = {
      action: 1,
      dataAnswer: null,
    };
    this.nextSlide.emit(data);
  }
}
