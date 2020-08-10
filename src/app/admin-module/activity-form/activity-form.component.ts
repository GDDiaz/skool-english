import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

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
  private formDataImage: FormData[] = [];
  private promisesImage = [];

  constructor(private fb: FormBuilder, private courseService: CoursesService, private sanitizer: DomSanitizer) { }

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
        image: [''],
      });

  }
 
  sendRequest() {
    if (this.action === 'new') {
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'dragDrop',
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

  setFormDataImage(event, index) {
    this.formDataImage[index] = event;
  }

  uploadFiles() {

    for (const formData of this.formDataImage) {
      this.promisesImage.push(this.courseService.uploadFiles(formData).toPromise());
    }
    return Promise.all(this.promisesImage).then(values => {
      for (let i = 0; i < values.length; i++) {
        if (this.action === 'edit' && values[i].path !== null) {
          // tslint:disable-next-line:no-string-literal
          this.questions.controls[i]['controls']['image'].patchValue(values[i].path);
        } else if (this.action === 'new') {
          // tslint:disable-next-line:no-string-literal
          this.questions.controls[i]['controls']['image'].patchValue(values[i].path);
        }
        
      }
      this.sendRequest();
    }).catch(error => console.error(error));
  }

  onSubmit() {
    this.disableButton = true;
    if (this.formDataImage!== null) {
      this.uploadFiles();
    } else {
      this.sendRequest();
    }
  }

  sanitizerUrl(url, addApiUrl) {
    if (addApiUrl) {
      url = `${environment.baseUrl + url}` ;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  hasImageFile(questionIndex) {
    const questionControls = this.questions.controls[questionIndex] as FormArray;
    // tslint:disable-next-line:no-string-literal
    if (questionControls['controls']['image'] !== undefined && questionControls['controls']['image'] !== '') {
      // tslint:disable-next-line:no-string-literal
      return questionControls['controls']['image'].value;
    }
    return false;
  }

  deleteAudio(workBankIndex, key = 'audio') {
    const questionControls = this.questions.controls[workBankIndex] as FormArray;
    // tslint:disable-next-line:no-string-literal
    if (questionControls['controls'][key] !== undefined && questionControls['controls'][key] !== '') {
      // tslint:disable-next-line:no-string-literal
      return questionControls['controls'][key].patchValue(null);
    }
  }
}
