import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements OnInit {
  @Input() courseId;
  @Input() position = 0;
  @Output() unit: EventEmitter<any> = new EventEmitter<any>();
  public form = this.fb.group({
    name: ['', Validators.required]
  });

  public disableButton = false;

  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.disableButton = true;
    const values = this.form.value;
    // tslint:disable-next-line:no-string-literal
    values['course_id'] = this.courseId;
    // tslint:disable-next-line:no-string-literal
    values['position'] = this.position;
    // TODO: backend service
    // this.unit.emit(values);
    this.courseService.newUnit(values).subscribe(r => {
      // tslint:disable-next-line:no-string-literal
      r['slides'] = [];
      this.unit.emit(r);
    }, error => console.error(error));
  }

}
