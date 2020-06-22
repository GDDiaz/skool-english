import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  createIframe(url: string) {
    // tslint:disable-next-line:max-line-length
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/hi4pzKvuEQM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  sanitizerUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
