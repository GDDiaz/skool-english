import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-show-slide',
  templateUrl: './show-slide.component.html',
  styleUrls: ['./show-slide.component.scss']
})
export class ShowSlideComponent implements OnInit {

  @Input() slide: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  createIframe(url: string) {
    if (url.includes('<iframe')) {
      return this.byPassHTML(url);
    } else if (url.includes('youtu')) {
      const matchs = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      return this.byPassHTML(`<iframe width="560"
      height="315"
      src="https://www.youtube.com/embed/${matchs[1]}"
      frameborder="0" allow="accelerometer;
      autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>`);
    } else {
      return this.byPassHTML(url);
    }
  }

  sanitizerUrl(url, addApiUrl) {
    if (addApiUrl) {
      url = `${environment.baseUrl + url}` ;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
