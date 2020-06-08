import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  newCourse(course) {
    return this.http.post<any>(`${environment.apiUrl}/v1/course`, course)
        .pipe(map(response => {
            return response;
        }));
  }

  newUnit(unit) {
    return this.http.post<any>(`${environment.apiUrl}/v1/unit`, unit)
    .pipe(map(response => {
        return response;
    }));
  }

  newSlide(slide) {
    return this.http.post<any>(`${environment.apiUrl}/v1/slide`, slide)
    .pipe(map(response => {
        response.content = JSON.parse(response.content);
        return response;
    }));
  }

  getAllCourse(): Observable<Course[]> {
    return this.http.get<any>(`${environment.apiUrl}/v1/course`)
        .pipe(map(response => {
            return response;
        }));
  }

  getUnitsByCourse(id: number): Observable<Course[]> {
    return this.http.get<any>(`${environment.apiUrl}/v1/units/${id}`)
        .pipe(map(response => {
            if (response.length > 0) {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < response.length; i++) {
                // tslint:disable-next-line:prefer-const
                let unit = response[i];
                for (let j = 0; j < unit.slides.length; j++) {
                  response[i].slides[j].content = JSON.parse(response[i].slides[j].content);
                }
              }
            }
            return response;
        }));
  }
}
