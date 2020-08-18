import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-slide-activity",
  templateUrl: "./slide-activity.component.html",
  styleUrls: ["./slide-activity.component.scss"],
})
export class SlideActivityComponent implements OnInit {
  @Input() dataSlide: any;
  @Output() nextSlide: EventEmitter<any> = new EventEmitter();
  public nameActivity: string;
  public questions: any;
  public typeQuestion: string;
  public answersSelected: Array<number>;
  public incorrectAnswer: boolean;
  public secondsIncorrect: number;
  public timerIncorrect: any;
  public page: number;
  public active: boolean;
  public imgUrl: string;
  public autoComplete: string;
  public tempImg: any;
  constructor(private studentService: StudentService) {
    this.answersSelected = [];
    this.active = false;
    this.incorrectAnswer = false;
  }

  ngOnInit(): void {
    this.page = 0;
    this.nameActivity = this.dataSlide.name;
    this.questions = this.dataSlide.questions;
    this.typeQuestion = this.dataSlide.typeQuestion;
    this.imgUrl =
      "http://api.skool.co/public" + this.dataSlide.questions[this.page].image;

    let test;
    test = document.getElementsByTagName("img");
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.answersSelected = [];
    this.active = false;
    this.page = 0;
    this.nameActivity = this.dataSlide.name;
    this.questions = this.dataSlide.questions;
  }

  selected(id) {
    console.log(this.page);
    console.log(this.questions.length);

    if (id === this.questions[this.page].answer) {
      if (this.page + 1 < this.questions.length) {
        this.answersSelected[this.page] = id;
        this.page = this.page + 1;
        this.imgUrl = "/assets/images/imgload.png";
        console.log(this.dataSlide.questions[this.page].image);

        this.studentService
          .getImage(this.dataSlide.questions[this.page].image)
          .subscribe(
            (response: any) => {
              console.log("asdasdasdasd");

              this.tempImg = response;
            },
            (error) => {
              console.log(error);
              this.imgUrl =
                "http://api.skool.co/public" +
                this.dataSlide.questions[this.page].image;
            },
            () => {
              this.imgUrl =
                "http://api.skool.co/public" +
                this.dataSlide.questions[this.page].image;
            }
          );

        console.log(this.imgUrl);
      } else {
        this.answersSelected[this.page] = id;
        this.nextSlide.emit(1);
      }
    } else {
      this.incorrectAnswer = true;
      this.secondsIncorrect = 2;
      this.timerIncorrect = setInterval(() => this.closeIncorrect(), 1000);
      console.log("Se equivoco");
    }

    console.log(this.answersSelected);
  }
  closeIncorrect() {
    this.secondsIncorrect--;

    if (this.secondsIncorrect <= 0) {
      this.incorrectAnswer = false;
      clearInterval(this.timerIncorrect);
    }
  }
  completar() {
    if (
      this.questions[this.page].answer.toLowerCase() ===
      this.autoComplete.toLowerCase()
    ) {
      if (this.page + 1 < this.questions.length) {
        this.page = this.page + 1;
        this.imgUrl =
          "http://api.skool.co/public" +
          this.dataSlide.questions[this.page].image;
      } else {
        this.nextSlide.emit(1);
      }
    } else {
      this.incorrectAnswer = true;
      this.secondsIncorrect = 2;
      this.timerIncorrect = setInterval(() => this.closeIncorrect(), 1000);
      console.log("Incorrecto");
    }
  }
}
