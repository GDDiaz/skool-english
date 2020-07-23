import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {
  currentPositionSlide = null;
  courseId;
  currentUnitId;
  currentSlide = null;
  showUnitForm = false;
  showPdfForm = false;
  showVideoForm = false;
  showQuizForm = false;
  showContentForm = false;
  showActivityForm = false;
  showSlideComponent = false;
  showImage = true;
  units = new Map<string, any>();
  public position: Subject<any>;
  public positionUnit: Subject<any>;
  constructor(private route: ActivatedRoute, private courseService: CoursesService) {
    this.position = new Subject<any>();
    this.positionUnit = new Subject<any>();
   }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
        if (params.params.id) {
          this.courseId = params.params.id;
          this.courseService.getUnitsByCourse(this.courseId).subscribe(response => {
            if (response.length > 0) {
              for (const unit of response) {
                // tslint:disable-next-line:no-string-literal
                this.units.set(unit['id'], unit);
              }
            }
          });
        }
    }, error => console.error(error));

    this.position.asObservable().pipe(debounceTime(3000)).subscribe(
      slides => {
        this.courseService.reorderSlides(slides).subscribe(
          response => { console.log(response); },
          error => console.error(error)
        );
      },
      error => console.error(error));

    this.positionUnit.asObservable().pipe(debounceTime(3000)).subscribe(
        units => {
          this.courseService.reorderUnit(units).subscribe(
            response => { console.log(response); },
            error => console.error(error)
          );
        },
        error => console.error(error));
  }

  get unitsArray() {
    const data = [];
    this.units.forEach((unit) => {
      if (unit.hasOwnProperty('position') && unit.position !== null) {
        data[unit.position] = unit;
      } else {
        data.push(unit);
      }
    });
    return data;
  }

  newUnit() {
    this.hiddenAllForms();
    this.showUnitForm = true;
  }

  createdUnit(unit) {
    this.units.set(unit.id, unit);
    this.showUnitForm = false;
  }

  newSlide(unitId, type) {
    this.currentUnitId = unitId;
    const currentUnit = this.units.get(unitId);
    this.currentPositionSlide = (currentUnit?.slides) ? currentUnit.slides.length : 0;
    this.hiddenAllForms();
    this.showForm(type);
  }

  private showForm(type) {
    switch (type) {
      case 'video':
        this.showVideoForm = true;
        break;
      case 'quiz':
        this.showQuizForm = true;
        break;
      case 'content':
        this.showContentForm = true;
        break;
      case 'activity':
        this.showActivityForm = true;
        break;
      case 'unit':
        this.showUnitForm = true;
        break;
      case 'pdf':
        this.showPdfForm = true;
        break;
      default:
        this.hiddenAllForms();
    }
  }

  addSlide(event) {
    const unit = this.units.get(this.currentUnitId);
    for (let index = 0; index < unit.slides.length; index++) {
      const slide = unit.slides[index];
      if (slide.id === event.id) {
        unit.slides[index] = event;
        this.units.set(this.currentUnitId, unit);
        this.hiddenAllForms();
        this.showImage = true;
        return true;
      }
    }
    unit.slides.push(event);
    this.units.set(this.currentUnitId, unit);
    this.hiddenAllForms();
  }

  private hiddenAllForms() {
    this.currentSlide = null;
    this.showUnitForm = false;
    this.showVideoForm = false;
    this.showQuizForm = false;
    this.showContentForm = false;
    this.showActivityForm = false;
    this.showSlideComponent = false;
    this.showPdfForm = false;
    this.showImage = false;
  }

  editSlide(slide: any, unitId) {
    this.currentUnitId = unitId;
    this.hiddenAllForms();
    this.currentSlide = slide;
    this.showForm(slide.type);
  }

  deleteSlide(slide: any, unitId, index) {
    this.currentUnitId = unitId;
    this.courseService.deleteSlide(slide.id).subscribe(r => {
      const unit = this.units.get(this.currentUnitId);
      unit.slides.splice(index, 1);
      this.units.set(this.currentUnitId, unit);
      this.hiddenAllForms();
      this.showImage = true;
    });
  }

  showSlide(slide: any) {
    this.hiddenAllForms();
    this.currentSlide = slide;
    this.showSlideComponent = true;
  }

  drop(event: CdkDragDrop<any[]>, unitIndex) {
    moveItemInArray(this.unitsArray[unitIndex].slides, event.previousIndex, event.currentIndex);
    for (let index = 0; index < this.unitsArray[unitIndex].slides.length; index++) {
       this.unitsArray[unitIndex].slides[index].position = index;
    }
    this.position.next(this.unitsArray[unitIndex].slides);
  }

  dropUnit(event: CdkDragDrop<any[]>) {
    const tmp = this.unitsArray;
    const unitsOrdered = [];
    moveItemInArray(tmp, event.previousIndex, event.currentIndex);
    for (let index = 0; index < tmp.length; index++) {
      tmp[index].position = index;
      unitsOrdered.push({ id: tmp[index].id, position: tmp[index].position });
      this.units.set(tmp[index].id, tmp[index]);
    }
    this.positionUnit.next(unitsOrdered);
  }

}
