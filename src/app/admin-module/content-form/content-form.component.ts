import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { environment } from '../../../environments/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';

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
  private formData: FormData[] = [];
  private promises = [];
  public form = this.fb.group({
    objective_title: ['', Validators.required],
    objectives: this.fb.array([]),
    video_url: [''],
    words_banks: this.fb.array([]),
    focus: [''],
  });
  loading = false;
  constructor(private fb: FormBuilder, private courseService: CoursesService, private sanitizer: DomSanitizer) { }

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

    for (const key in data.words_banks) {
      if (data.words_banks.hasOwnProperty(key)) {
        const wordBank = data.words_banks[key];
        this.addWordBank();
        if (wordBank.hasOwnProperty('words')) {
          for (const i in wordBank.words) {
            if (wordBank.words.hasOwnProperty(i)) {
              this.addWord(key);
            }
          }
        }
      }
    }
    this.form.patchValue(data);
  }

  get words_banks() {
    return this.form.get('words_banks') as FormArray;
  }

  addWordBank() {
    this.words_banks.push(
      this.fb.group({
        word_bank_title: ['', Validators.required],
        audio: [''],
        words: this.fb.array([])
      })
    );
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
        this.words_banks.controls[i]['controls']['audio'].patchValue(values[i].path);
      }
      this.sendRequest();
    }).catch(error => console.error(error));
  }

  getWordControl(i) {
    const wordBankControls = this.words_banks.controls[i] as FormArray;
    // tslint:disable-next-line:no-string-literal
    return wordBankControls.controls['words'] as FormArray;
  }

  addWord(i) {
    this.getWordControl(i).push(this.fb.group({
      word: ['', Validators.required],
      traduction: ['', Validators.required]
    }));
  }

  onSubmit() {
    this.disableButton = true;
    if (this.formData !== null) {
      this.uploadFiles();
    } else {
      this.sendRequest();
    }

  }

  private sendRequest() {
    this.loading = true;
    if (this.action === 'new') {
      const data = {
        course_id: this.courseId,
        unit_id: this.unitId,
        type: 'content',
        content: JSON.stringify(this.form.value)
      };

      this.courseService.newSlide(data).subscribe(r => {
        this.loading = false;
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

  sanitizerUrl(url, addApiUrl) {
    if (addApiUrl) {
      url = `${environment.baseUrl + url}` ;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  hasAudioFile(workBankIndex) {
    const wordBankControls = this.words_banks.controls[workBankIndex] as FormArray;
    // tslint:disable-next-line:no-string-literal
    if (wordBankControls['controls']['audio'] !== undefined && wordBankControls['controls']['audio'] !== '') {
      // tslint:disable-next-line:no-string-literal
      return wordBankControls['controls']['audio'].value;
    }
    return false;
  }

  deleteAudio(workBankIndex) {
    const wordBankControls = this.words_banks.controls[workBankIndex] as FormArray;
    // tslint:disable-next-line:no-string-literal
    if (wordBankControls['controls']['audio'] !== undefined && wordBankControls['controls']['audio'] !== '') {
      // tslint:disable-next-line:no-string-literal
      return wordBankControls['controls']['audio'].patchValue(null);
    }
  }

}
