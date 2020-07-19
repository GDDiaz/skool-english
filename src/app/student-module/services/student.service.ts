import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  public dataLeccion: any;
  constructor(private http: HttpClient) {}

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
}
