import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-unit-video-form',
  templateUrl: './unit-video-form.component.html',
  styleUrls: ['./unit-video-form.component.scss']
})
export class UnitVideoFormComponent implements OnInit {

  @Input() courseId;
  @Input() unitId;
  @Output() resource: EventEmitter<any> = new EventEmitter<any>();

  public disableButton = false;
  public form = this.fb.group({
    video_title: ['', Validators.required],
    video_url: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.disableButton = true;
    const values = this.form.value;
    // tslint:disable-next-line:no-string-literal
    values['course_id'] = this.courseId;
    // tslint:disable-next-line:no-string-literal
    values['unit_id'] = this.unitId;
    // tslint:disable-next-line:no-string-literal
    values['id'] = Math.random();
    // tslint:disable-next-line:no-string-literal
    values['type'] = 'video';

    // TODO: backend service
    this.resource.emit(values);
    /*this.courseService.newUnit(values).subscribe(r => {
      this.unit.emit(r);
    });*/
  }

}
