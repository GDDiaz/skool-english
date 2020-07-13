import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-activity-choice-form',
  templateUrl: './activity-choice-form.component.html',
  styleUrls: ['./activity-choice-form.component.scss']
})
export class ActivityChoiceFormComponent implements OnInit {

  @Input() courseId;
  @Input() position = 0;
  @Input() unitId;
  @Input() slide;
  @Output() test: EventEmitter<any> = new EventEmitter<any>();

  public title = 'Nueva Actividad';
  public action = 'new';
  public disableButton = false;
  public form = this.fb.group({
    name: ['', Validators.required],
    questions: this.fb.array([])
  });
  private formData: FormData[] = [];
  private promises = [];

  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit(): void {

    if (this.slide !== null) {
      this.title = 'Editar Actividad';
      this.action = 'edit';
      this.buildEditForm(this.slide.content);
    }
  }

  private buildEditForm(data) {
    for (const key in data.questions) {
      if (data.questions.hasOwnProperty(key)) {
        const question = data.questions[key];
        this.addQuestion();
        if (question.hasOwnProperty('options')) {
          for (const i in question.options) {
            if (question.options.hasOwnProperty(i)) {
              this.addAnswerForm(key);
            }
          }
        }
      }
    }
    this.form.patchValue(data);
  }

  get questions() {
    return this.form.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.newQuestionForm());
  }

  newQuestionForm() {
      return this.fb.group({
        question: ['', Validators.required],
        audio: [''],
        answer: ['', Validators.required],
        options: this.fb.array([])
      });

  }

  getAnswerControl(i) {
    const questionsControls = this.questions.controls[i] as FormArray;
    // tslint:disable-next-line:no-string-literal
    return questionsControls.controls['options'] as FormArray;
  }

  addAnswerForm(i) {
    this.getAnswerControl(i).push(this.newAnswerForm());
  }

  newAnswerForm() {
    return this.fb.group({
      option: ['', Validators.required]
    });
  }

  sendRequest() {
    if (this.action === 'new') {
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'activity',
        subType: 'choice',
        position: this.position,
        content: JSON.stringify(this.form.value)
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.test.emit(r);
      }, error => console.error(error));
    } else {
      const data = {
        content: JSON.stringify(this.form.value)
      };

      this.courseService.editSlide(this.slide.id, data).subscribe(r => {
        this.test.emit(r);
      }, error => console.error(error));
    }
  }

  setFormData(event, index) {
    this.formData[index] = event;
  }

  uploadFiles() {
    for (const formData of this.formData) {
      this.promises.push(this.courseService.uploadFiles(formData).toPromise());
    }
    return Promise.all(this.promises).then(values => {
      for (let i = 0; i < values.length; i++) {
        // tslint:disable-next-line:no-string-literal
        this.questions.controls[i]['controls']['audio'].patchValue(values[i].path);
      }
      this.sendRequest();
    }).catch(error => console.error(error));
  }

  onSubmit() {
    this.disableButton = true;
    if (this.formData !== null) {
      this.uploadFiles();
    } else {
      this.sendRequest();
    }
  }

}
