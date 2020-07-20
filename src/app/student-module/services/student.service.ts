import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  public dataLeccion: any;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getAllCourse(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/v1/course`).pipe(
      map((response) => {
        console.log(response);

        return response;
      })
    );
  }

  getUnitsByCourse(id): Observable<any> {
    const url = `${environment.apiUrl}/v1/units/${id}`;
    return this.http
      .get(url, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
      .pipe(map((data) => data));
  }
  getUnitById(id): Observable<any> {
    const url = `${environment.apiUrl}/v1/unit/${id}`;
    return this.http
      .get(url, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
      .pipe(map((data) => data));
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
