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
    this.audio.src = environment.baseUrl + this.urlAudio;
    this.audio.load();
  }
  play() {
    this.bandPlay = true;

    this.audio.play();
  }
  pause() {
    this.bandPlay = false;
    this.audio.pause();
  }
}
