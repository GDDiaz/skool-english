import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "app-slide-content",
  templateUrl: "./slide-content.component.html",
  styleUrls: ["./slide-content.component.scss"],
})
export class SlideContentComponent implements OnInit {
  @Input() dataSlide: any;
  public step: number;
  public video: any;
  public objective: any;
  public wordsBank: Array<any>;
  public focus: any;
  public pageWordBank: number;
  public lastPage: number;
  constructor(private sanitizer: DomSanitizer) {
    this.step = 1;
    this.lastPage = 0;
    this.video = "";
    this.objective = "";
    this.wordsBank = [];
    this.focus = "";
    this.pageWordBank = 0;
  }

  ngOnInit(): void {
    console.log(this.dataSlide);

    this.video = this.createIframe(this.dataSlide.video_url);
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

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  createIframe(url: string) {
    if (url.includes("<iframe")) {
      return this.byPassHTML(url);
    } else if (url.includes("youtu")) {
      const matchs = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      return this.byPassHTML(`<iframe width="900"
      height="550"
      src="https://www.youtube.com/embed/${matchs[1]}"
      frameborder="0" allow="accelerometer;
      autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>`);
    } else {
      return this.byPassHTML(url);
    }
  }
}
