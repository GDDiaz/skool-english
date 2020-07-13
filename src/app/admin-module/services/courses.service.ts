import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { User2 } from 'src/app/models/user';
import { User } from '../../models/user';

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

  editSlide(id, content) {
    return this.http.post<any>(`${environment.apiUrl}/v1/slide/edit/${id}`, content)
    .pipe(map(response => {
        response.content = JSON.parse(response.content);
        return response;
    }));
  }

  uploadFiles(sendableFormData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/v1/upload`, sendableFormData)
    .pipe(map(response => {
        return response;
    }));
  }

  deleteSlide(id) {
    return this.http.post<any>(`${environment.apiUrl}/v1/slide/delete/${id}`, null)
    .pipe(map(response => response));
  }

  getAllCourse(): Observable<Course[]> {
    return this.http.get<any>(`${environment.apiUrl}/v1/course`)
        .pipe(map(response => {
            return response;
        }));
  }

  getUsers(type: number): Observable<User2[]> {
    return this.http.get<any>(`${environment.apiUrl}/v1/users/${type}`)
        .pipe(map(response => {
            return response;
        }));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/v1/user/${id}`)
        .pipe(map(response => {
            return response;
        }));
  }

  newUser(user) {
    return this.http.post<any>(`${environment.apiUrl}/v1/user`, user)
    .pipe(map(response => {
        return response;
    }));
  }

  editUser(id, user) {
    return this.http.post<any>(`${environment.apiUrl}/v1/user/edit/${id}`, user)
    .pipe(map(response => {
        return response;
    }));
  }

  deleteUser(id) {
    return this.http.post<any>(`${environment.apiUrl}/v1/user/delete/${id}`, null)
    .pipe(map(response => response));
  }

  addCourse(id, courses) {
    return this.http.post<any>(`${environment.apiUrl}/v1/user/addCourse/${id}`, courses);
  }

  getUnitsByCourse(id: number): Observable<Course[]> {
    return this.http.get<any>(`${environment.apiUrl}/v1/units/${id}`)
        .pipe(map(response => {
            if (response.length > 0) {
              const units = [];
              let replaceUnits = true;
              let beforePositionUnit = null;
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < response.length; i++) {
                // tslint:disable-next-line:prefer-const
                let unit = response[i];
                const slides = [];
                let replaceSlide = true;
                let beforePosition = null;
                for (let j = 0; j < unit.slides.length; j++) {
                  response[i].slides[j].content = JSON.parse(response[i].slides[j].content);
                  if (beforePosition !== response[i].slides[j].position) {
                    slides[response[i].slides[j].position] = response[i].slides[j];
                  } else  {
                    replaceSlide = false;
                  }
                  beforePosition = response[i].slides[j].position;
                }
                if (replaceSlide) {
                  response[i].slides = slides;
                }

                if (beforePositionUnit !== unit.position) {
                  units[unit.position] = response[i];
                } else  {
                  replaceUnits = false;
                }
                beforePositionUnit = response[i].position;
              }
              if (replaceUnits) {
                response = units;
              }
            }
            return response;
        }));
  }

  reorderSlides(slides) {
    return this.http.post<any>(`${environment.apiUrl}/v1/slide/reorder-slides`, {slides})
        .pipe(map(response => {
            return response;
        }));
  }

  reorderUnit(units) {
    return this.http.post<any>(`${environment.apiUrl}/v1/unit/reorder-units`, {units})
        .pipe(map(response => {
            return response;
        }));
  }
}
