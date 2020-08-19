import { Component, OnInit, Input } from "@angular/core";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-audio-button",
  templateUrl: "./audio-button.component.html",
  styleUrls: ["./audio-button.component.scss"],
})
export class AudioButtonComponent implements OnInit {
  @Input() urlAudio: any;
  public bandPlay: boolean;
  public audio: any;
  constructor() {
    this.bandPlay = false;
  }

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = "http://api.skool.co/public" + this.urlAudio;
    this.audio.load();
  }
  play() {
    this.bandPlay = !this.bandPlay;

    this.audio.play();
    let variable = this;
    this.audio.onended = function () {
      variable.bandPlay = false;
    };
  }
  pause() {
    this.bandPlay = false;
    this.audio.pause();
  }
}
