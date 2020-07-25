import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { environment } from "../../../environments/environment";
import { StudentService } from "../services/student.service";
@Component({
  selector: "app-slide-content",
  templateUrl: "./slide-content.component.html",
  styleUrls: ["./slide-content.component.scss"],
})
export class SlideContentComponent implements OnInit {
  @Input() dataSlide: any;
  @Output() nextSlide: EventEmitter<any> = new EventEmitter();
  public step: number;
  public video: any;
  public objective: any;
  public wordsBank: Array<any>;
  public focus: any;
  public pageWordBank: number;
  public lastPage: number;
  public progress: number;
  public width: any;
  constructor(private studenService: StudentService) {
    this.step = 1;
    this.lastPage = 0;
    this.video = "";
    this.objective = "";
    this.wordsBank = [];

    this.focus = "";
    this.pageWordBank = 0;
  }

  ngOnInit(): void {
    this.width = window.screen.width;
    this.step = 1;
    console.log(this.dataSlide);

    if (this.width > 769) {
      this.video = this.studenService.createIframe(this.dataSlide.video_url);
    }
    if (this.width <= 769) {
      this.video = this.studenService.createIframeMobile(
        this.dataSlide.video_url
      );
    }
    this.objective = {
      title: this.dataSlide.objective_title,
      objectivesArray: this.dataSlide.objectives,
    };
    this.wordsBank = this.dataSlide.words_banks;
    this.focus = this.dataSlide.focus;

    if (this.video !== "") {
      this.lastPage = this.lastPage + 1;
    }
    if (this.objective !== "") {
      this.lastPage = this.lastPage + 1;
    }
    if (this.wordsBank !== []) {
      this.lastPage = this.lastPage + 1;
    }
    if (this.focus !== "") {
      this.lastPage = this.lastPage + 1;
    }

    console.log(this.lastPage);
  }
  previusStep() {
    if (this.step === 3) {
      if (this.pageWordBank > 0) {
        this.pageWordBank = this.pageWordBank - 1;
      } else {
        this.step = this.step - 1;
      }
    } else {
      this.step = this.step - 1;
    }
  }
  nextStep() {
    this.progress = this.step / this.lastPage;
    if (this.step === this.lastPage) {
      let data = {
        action: 1,
        dataAnswer: null,
      };
      this.nextSlide.emit(data);
    } else {
      if (this.step === 3) {
        if (this.pageWordBank + 1 < this.wordsBank.length) {
          this.pageWordBank = this.pageWordBank + 1;
        } else {
          this.step = this.step + 1;
        }
      } else {
        this.step = this.step + 1;
      }
    }
  }
  play() {
    console.log("asdasd");

    let audio = new Audio();
    audio.src = environment.baseUrl + this.wordsBank[this.pageWordBank].audio;
    console.log(audio.src);

    audio.load();
    audio.play();
  }
}
