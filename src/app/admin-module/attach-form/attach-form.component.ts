import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-attach-form',
  templateUrl: './attach-form.component.html',
  styleUrls: ['./attach-form.component.scss']
})
export class AttachFormComponent implements OnInit {

  @Input() courseId;
  @Input() position = 0;
  @Input() unitId;
  @Input() slide;
  @Output() test: EventEmitter<any> = new EventEmitter<any>();

  public disableButton = false;
  public title = 'Nuevo PDF';
  public action = 'new';
  loading = false;
  private formData: FormData = null;
  public currentFiles = [];
  public form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit(): void {
    if (this.slide !== null) {
      this.title = 'Editar Adjunto';
      this.action = 'edit';
      this.currentFiles = this.slide.content.files ?? [];
      this.form.patchValue(this.slide.content);
    }
  }

  setFormData(event) {
    this.formData = event;
    this.disableButton = true;
  }

  deleteAttach(index) {
    this.currentFiles.splice(index, 1);
  }

  onSubmit() {
    if (this.formData !== null) {
      this.courseService.uploadFiles(this.formData).subscribe(
        response => {
          this.send(response);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.send([]);
    }
  }

  send(files) {
    const value = this.form.value;
    if (this.action === 'new') {
      // tslint:disable-next-line:no-string-literal
      value['files'] = files;
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'pdf',
        position: this.position,
        content: JSON.stringify(value)
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.loading = false;
        this.test.emit(r);
      }, error => console.error(error));
    } else {
      // tslint:disable-next-line:no-string-literal
      value['files'] = this.currentFiles.concat(files);
      const data = {
        content: JSON.stringify(value)
      };

      this.courseService.editSlide(this.slide.id, data).subscribe(r => {
        this.test.emit(r);
      }, error => console.error(error));
    }
  }

}
