import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";

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
  public answersSelected: Array<number>;
  public page: number;
  public active: boolean;
  constructor() {
    this.answersSelected = [];
    this.active = false;
  }

  ngOnInit(): void {
    this.page = 0;
    this.nameActivity = this.dataSlide.name;
    this.questions = this.dataSlide.questions;

    console.log(this.dataSlide.name);
    console.log(this.questions);
    let test;
    test = document.getElementsByTagName("img");
    console.log(test);
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
      } else {
        this.answersSelected[this.page] = id;
        this.nextSlide.emit(1);
      }
    }

    console.log(this.answersSelected);
  }
}
