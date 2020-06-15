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
  @Input() unitId;
  @Output() test: EventEmitter<any> = new EventEmitter<any>();

  public typeQuestionSelected: any;
  public typesQuestions = ['Única respuesta', 'Multiple respuesta', 'Autocompletar'];
  public disableButton = false;
  public form = this.fb.group({
    name: ['', Validators.required],
    typeQuestion: [''],
    questions: this.fb.array([])
  });
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
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
    const data = {
      course_id: this.courseId,
      unit_id: this.unitId,
      type: 'video',
      content: JSON.stringify(this.form.value)
    };

    this.courseService.newSlide(data).subscribe(r => {
      this.test.emit(r);
    });
  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

}
