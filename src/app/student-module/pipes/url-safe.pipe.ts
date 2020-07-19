import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "urlSafe",
})
export class UrlSafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
