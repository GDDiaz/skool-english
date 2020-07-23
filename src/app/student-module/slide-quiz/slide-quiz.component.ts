import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-slide-quiz",
  templateUrl: "./slide-quiz.component.html",
  styleUrls: ["./slide-quiz.component.scss"],
})
export class SlideQuizComponent implements OnInit {
  @Input() dataSlide: any;
  @Output() nextSlide: EventEmitter<any> = new EventEmitter();
  public quizName: string;
  public questions: Array<any>;
  public typeQuestion: string;
  public answersUniqueSelected: Array<number>;
  public answersMultiSelected: Array<any>;
  public answerMulti: Array<boolean>;
  public answerAutoComplete: Array<string>;

  public checkBox: any;
  public answersSelected;
  public page: number;
  public answer: number;
  constructor() {
    this.answerAutoComplete = [];
    this.answersUniqueSelected = [];
    this.page = 0;
    this.answerMulti = [];
    this.answersMultiSelected = [
      {
        question: 0,
        answer: [],
      },
    ];
  }

  ngOnInit(): void {
    this.resetComponent();
    this.quizName = this.dataSlide.name;
    this.questions = this.dataSlide.questions;
    this.typeQuestion = this.dataSlide.typeQuestion;

    if (this.typeQuestion === "Multiple respuesta") {
      console.log(this.questions[this.page].options);
      for (
        let index = 0;
        index < this.questions[this.page].options.length;
        index++
      ) {
        this.answerMulti[index] = false;
      }
      console.log(this.answerMulti);
    }

    console.log(this.quizName);
    console.log(this.questions);
    console.log(this.typeQuestion);
  }
  selected(i) {
    this.answerMulti[i] = !this.answerMulti[i];
    console.log(this.answerMulti);
  }
  previusStep() {
    this.page = this.page - 1;
  }
  nextStep() {
    this.checkBox;
    if (this.typeQuestion === "Única respuesta") {
      if (this.page + 1 < this.questions.length) {
        this.answersUniqueSelected[this.page] = this.answer;
        this.answer = null;
        this.page = this.page + 1;
      } else {
        this.answersUniqueSelected[this.page] = this.answer;
        console.log("Respuestas-", this.answersUniqueSelected);
        let data = {
          action: 1,
          dataAnswer: this.answersUniqueSelected,
        };
        this.nextSlide.emit(data);
      }
    }

    if (this.typeQuestion === "Multiple respuesta") {
      if (this.page + 1 < this.questions.length) {
        this.answersMultiSelected[this.page] = {
          question: this.page,
          answer: this.answerMulti,
        };
        this.page = this.page + 1;
        this.answerMulti = [];
        for (
          let index = 0;
          index < this.questions[this.page].options.length;
          index++
        ) {
          this.answerMulti[index] = false;
        }
      } else {
        this.answersMultiSelected[this.page] = {
          question: this.page,
          answer: this.answerMulti,
        };
        let data = {
          action: 1,
          dataAnswer: this.answersMultiSelected,
        };
        console.log(data);

        this.nextSlide.emit(data);
      }
    }
    if (this.typeQuestion === "Autocompletar") {
      if (this.page + 1 < this.questions.length) {
        this.page = this.page + 1;
      } else {
        let data = {
          action: 1,
          dataAnswer: this.answerAutoComplete,
        };
        console.log(data);

        this.nextSlide.emit(data);
      }
    }
  }

  resetComponent() {
    this.answerMulti = [];
    this.answerAutoComplete = [];
    this.answersUniqueSelected = [];
    this.page = 0;
    this.quizName = this.dataSlide.name;
    this.questions = this.dataSlide.questions;
    this.typeQuestion = this.dataSlide.typeQuestion;
    this.answersMultiSelected = [];

    if (this.typeQuestion === "Multiple respuesta") {
      console.log(this.questions[this.page].options);
      for (
        let index = 0;
        index < this.questions[this.page].options.length;
        index++
      ) {
        this.answerMulti[index] = false;
      }
      console.log(this.answerMulti);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("asdasd");

    this.resetComponent();
  }
}
