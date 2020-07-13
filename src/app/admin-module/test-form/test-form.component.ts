import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  @Input() courseId;
  @Input() position = 0;
  @Input() unitId;
  @Input() slide;
  @Output() test: EventEmitter<any> = new EventEmitter<any>();

  public typeQuestionSelected: any;
  public title = 'Nuevo Quiz';
  public action = 'new';
  public typesQuestions = ['Única respuesta', 'Multiple respuesta', 'Autocompletar'];
  public disableButton = false;
  public form = this.fb.group({
    name: ['', Validators.required],
    typeQuestion: [''],
    questions: this.fb.array([])
  });
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
    if (this.slide !== null) {
      this.title = 'Editar Quiz';
      this.action = 'edit';
      this.buildEditForm(this.slide.content);
    }
  }


  private buildEditForm(data) {
    for (const key in data.questions) {
      if (data.questions.hasOwnProperty(key)) {
        const question = data.questions[key];
        this.typeQuestionSelected = question.typeQuestion;
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
    if (this.typeQuestionSelected === undefined) {
      return;
    }
    this.questions.push(this.newQuestionForm());
  }

  newQuestionForm() {
    if (this.typeQuestionSelected === 'Multiple respuesta') {
      return this.fb.group({
        question: ['', Validators.required],
        typeQuestion: [this.typeQuestionSelected],
        options: this.fb.array([])
      });
    }
    if (this.typeQuestionSelected === 'Única respuesta') {
      return this.fb.group({
        question: ['', Validators.required],
        typeQuestion: [this.typeQuestionSelected],
        answer: ['', Validators.required],
        options: this.fb.array([])
      });
    }
    return this.fb.group({
      question: ['', Validators.required],
      typeQuestion: [this.typeQuestionSelected],
      answer: ['', Validators.required],
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
      option: ['', Validators.required],
      is_correct: ['']
    });
  }

  onSubmit() {
    this.disableButton = true;
    if (this.action === 'new') {
      const data = {
        position: this.position,
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'quiz',
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

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
