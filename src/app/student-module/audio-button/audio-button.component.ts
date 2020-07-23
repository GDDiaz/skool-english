import { Component, OnInit, Input } from "@angular/core";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-audio-button",
  templateUrl: "./audio-button.component.html",
  styleUrls: ["./audio-button.component.scss"],
})
export class AudioButtonComponent implements OnInit {
  @Input() urlAudio: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.urlAudio);
  }
  play() {
    let audio = new Audio();
    audio.src = environment.baseUrl + this.urlAudio;
    console.log(audio.src);

    audio.load();
    audio.play();
  }
}
