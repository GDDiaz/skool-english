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
  public unidadId: any;
  public slideId: any;
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

  saveAnswer(json): Observable<any> {
    const url = `${environment.apiUrl}/v1/slide/user`;
    const body = json;
    return this.http
      .post(url, body, {
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

  createIframeMobile(url: string) {
    if (url.includes("<iframe")) {
      return this.byPassHTML(url);
    } else if (url.includes("youtu")) {
      const matchs = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      return this.byPassHTML(`<iframe width="300"
      height="300"
      src="https://www.youtube.com/embed/${matchs[1]}"
      frameborder="0" allow="accelerometer;
      autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>`);
    } else {
      return this.byPassHTML(url);
    }
  }
  getImage(id) {
    const url = `http://api.skool.co/public${id}`;
    console.log(url);

    return this.http.get(url).pipe(map((data) => data));
  }
  sendMessages(json): Observable<any> {
    const url = `${environment.apiUrl}/v1/message`;
    const body = json;
    return this.http
      .post(url, body, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
      .pipe(map((data) => data));
  }
  getMessages(id): Observable<any> {
    const url = `${environment.apiUrl}/v1/message/course/${id}`;
    return this.http
      .get(url, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      })
      .pipe(map((data) => data));
  }
  saveFile(file): Observable<any> {
    console.log(file[0]);

    const url = `${environment.apiUrl}/v1/upload`;
    let body = new FormData();
    body.append("file[0]", file[0]);

    return this.http.post(url, body).pipe(map((data) => data));
  }
}
