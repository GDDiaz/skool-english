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
    const data = {
      course_id: this.courseId,
      unit_id: this.unitId,
      type: 'video',
      content: JSON.stringify(this.form.value)
    };

    this.courseService.newSlide(data).subscribe(r => {
      this.resource.emit(r);
    });
  }

}
