import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-show-slide',
  templateUrl: './show-slide.component.html',
  styleUrls: ['./show-slide.component.scss']
})
export class ShowSlideComponent implements OnInit {

  @Input() slide: any;
  dragDropImages = [];
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.slide.type === 'dragDrop') {
      for (const question of this.slide.content.questions ) {
        this.dragDropImages.push(question.image);
      }
    }
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dragDropImages, event.previousIndex, event.currentIndex);
  }

}
