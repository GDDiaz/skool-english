import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unit-video-form',
  templateUrl: './unit-video-form.component.html',
  styleUrls: ['./unit-video-form.component.scss']
})
export class UnitVideoFormComponent implements OnInit {

  @Input() courseId;
  @Input() unitId;
  @Input() slide;
  @Input() position = 0;
  @Output() resource: EventEmitter<any> = new EventEmitter<any>();

  public disableButton = false;
  public title = 'Nuevo Vídeo';
  public action = 'new';
  public form = this.fb.group({
    video_title: ['', Validators.required],
    video_url: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private courseService: CoursesService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.slide !== null) {
      this.title = 'Editar Vídeo';
      this.action = 'edit';
      this.form.patchValue(this.slide.content);
    }
  }

  onSubmit() {
    this.disableButton = true;
    if (this.action === 'new') {
      const data = {
        position: this.position,
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'video',
        content: JSON.stringify(this.form.value)
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.toastr.success('Finalizado!', 'Se agrego un nuevo video!');
        this.resource.emit(r);
      });
    } else {
      const data = {
        content: JSON.stringify(this.form.value)
      };
      this.courseService.editSlide(this.slide.id, data).subscribe(r => {
        this.toastr.success('Finalizado!', 'Se editó correctamente!');
        this.resource.emit(r);
      });
    }
  }

}
