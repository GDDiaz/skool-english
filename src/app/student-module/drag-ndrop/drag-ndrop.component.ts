import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-drag-ndrop",
  templateUrl: "./drag-ndrop.component.html",
  styleUrls: ["./drag-ndrop.component.scss"],
})
export class DragNdropComponent implements OnInit {
  error: boolean;
  constructor() {}

  ngOnInit(): void {
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

            if ($(this).hasClass(dragedElement)) {
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
}
