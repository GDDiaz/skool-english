import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  @Input() courseId;
  @Input() unitId;
  @Input() slide;
  @Output() resource: EventEmitter<any> = new EventEmitter<any>();

  public disableButton = false;
  public title = 'Nueva Actividad';
  public action = 'new';
  public form = this.fb.group({
    name: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
    if (this.slide !== null) {
      this.title = 'Editar Actividad';
      this.action = 'edit';
      this.form.patchValue(this.slide.content);
    }
  }

  onSubmit() {
    this.disableButton = true;
    if (this.action === 'new') {
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'activity',
        content: JSON.stringify(this.form.value)
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.resource.emit(r);
      }, error => console.error(error));
    } else {
      const data = {
        content: JSON.stringify(this.form.value)
      };
      this.courseService.editSlide(this.slide.id, data).subscribe(r => {
        this.resource.emit(r);
      }, error => console.error(error));
    }
  }

}
