import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '../services/courses.service';

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

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    if (this.slide !== null) {
      this.title = 'Editar Adjunto';
      this.action = 'edit';
    }
  }

  setFormData(event, index) {
    this.formData = event;
    this.disableButton = true;
  }

  deleteAttach(workBankIndex) {

  }

  onSubmit() {
    this.courseService.uploadFiles(this.formData).subscribe(
      response => {
        this.send(response.path);
      },
      error => {
        console.error(error);
      }
    );
  }

  send(path) {
    if (this.action === 'new') {
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'pdf',
        position: this.position,
        content: JSON.stringify({path})
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.loading = false;
        this.test.emit(r);
      }, error => console.error(error));
    } else {
      const data = {
        content: JSON.stringify({path})
      };

      this.courseService.editSlide(this.slide.id, data).subscribe(r => {
        this.test.emit(r);
      }, error => console.error(error));
    }
  }

}
