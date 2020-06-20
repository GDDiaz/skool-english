import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {
  courseId;
  currentUnitId;
  currentSlide = null;
  showUnitForm = false;
  showVideoForm = false;
  showQuizForm = false;
  showContentForm = false;
  showActivityForm = false;
  units = new Map<string, any>();
  constructor(private route: ActivatedRoute, private courseService: CoursesService) { }

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
    });
  }

  get unitsArray() {
    const data = [];
    this.units.forEach((unit) => {
      data.push(unit);
    });
    return data;
  }

  newUnit(unitId) {
    this.currentUnitId = unitId;
    this.hiddenAllForms();
    this.showUnitForm = true;
  }

  createdUnit(unit) {
    this.units.set(unit.id, unit);
    this.showUnitForm = false;
  }

  newSlide(unitId, type) {
    this.currentUnitId = unitId;
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
      default:
        this.hiddenAllForms();
    }
  }

  addSlide(event) {
    const unit = this.units.get(this.currentUnitId);
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
  }

  editSlide(slide: any) {
    this.hiddenAllForms();
    this.currentSlide = slide;
    this.showForm(slide.type);
  }

}
