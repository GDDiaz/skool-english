import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-drag-ndrop",
  templateUrl: "./drag-ndrop.component.html",
  styleUrls: ["./drag-ndrop.component.scss"],
})
export class DragNdropComponent implements OnInit {
  @Input() dataSlide: any;
  @Output() nextSlide: EventEmitter<any> = new EventEmitter();
  error: boolean;
  public baseUrlImg: string;
  public imgURL: string;
  public questions: any;
  public clasesImg: Array<string>;
  constructor() {
    this.baseUrlImg = "http://api.skool.co/public";
    this.clasesImg = [];
  }

  ngOnInit(): void {
    console.log(this.dataSlide);
    this.questions = this.dataSlide.questions;

    for (let index = 0; index < this.questions.length; index++) {
      this.clasesImg.push(this.questions[index].question);
    }
    this.clearClassImg();
    console.log(this.clasesImg);

    this.error = false;

    $(function () {
      function updateDroppables() {
        $("div.blanks").droppable({
          accept: "span.given",
          classes: {
            "ui-droppable-hover": "ui-state-hover",
          },
          drop: function (event, ui) {
            var dragedElement = ui.draggable.text();

            var dropped = ui.draggable;

            console.log(dragedElement);
            console.log($(this).hasClass(dragedElement));

            if ($(this).hasClass(dragedElement.replace(" ", ""))) {
              console.log(dropped);
              dropped.hide();
              console.log(dragedElement);
              console.log($(this));

              $(this).text(dragedElement);
              $(this).addClass("phraseSuccess");
              $(".error").text("");
            } else {
              $(".error").text("** Wrong answer **");
            }
          },
        });
      }

      updateDroppables();

      $("span.given").draggable({
        helper: "clone",
        revert: "invalid",
      });
    });
  }
  nextStep() {
    let data = {
      action: 1,
      dataAnswer: null,
    };
    this.nextSlide.emit(data);
  }
  clearClassImg() {
    for (let index = 0; index < this.clasesImg.length; index++) {
      this.clasesImg[index] = this.clasesImg[index].replace(" ", "");
    }
    console.log(this.clasesImg);
  }
}
