import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {

  @Input() courseId;
  @Input() unitId;
  @Input() slide;
  @Output() test: EventEmitter<any> = new EventEmitter<any>();

  public disableButton = false;
  public title = 'Nuevo Contenido';
  public action = 'new';
  private formData = null;
  public form = this.fb.group({
    objective_title: ['', Validators.required],
    objectives: this.fb.array([]),
    video_url: [''],
    word_bank_title: ['', Validators.required],
    words: this.fb.array([]),
    audio: ['']
  });
  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
    if (this.slide !== null) {
      this.title = 'Editar Contenido';
      this.action = 'edit';
      this.buildEditForm(this.slide.content);
    }
  }

  private buildEditForm(data) {
    for (const iterator of data.objectives) {
      this.addObjective();
    }
    for (const iterator of data.words) {
      this.addWord();
    }
    this.form.patchValue(data);
  }

  get objectives() {
    return this.form.get('objectives') as FormArray;
  }

  addObjective() {
    this.objectives.push(
      this.fb.group({
        icon: [''],
        objective: ['', Validators.required]
      })
    );
  }

  setFormData(event) {
    this.formData = event;
  }

  uploadFiles() {
    return this.courseService.uploadFiles(this.formData).subscribe(event => {
      this.form.get('audio').patchValue(event.path);
      this.sendRequest();
    },
      error => alert('Error Uploading Files: ' + error.message)
    );
  }

  get words() {
    return this.form.get('words') as FormArray;
  }

  addWord() {
    this.words.push(this.fb.group({
      word: ['', Validators.required],
      traduction: ['', Validators.required]
    }));
  }

  onSubmit() {
    if (this.formData !== null) {
      this.uploadFiles();
    } else {
      this.sendRequest();
    }

  }

  private sendRequest() {
    this.disableButton = true;
    if (this.action === 'new') {
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'content',
        content: JSON.stringify(this.form.value)
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.test.emit(r);
      });
    } else {
      const data = {
        content: JSON.stringify(this.form.value)
      };

      this.courseService.editSlide(this.slide.id, data).subscribe(r => {
        this.test.emit(r);
      });
    }
  }

}
