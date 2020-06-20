import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {

  @Input() courseId;
  @Input() unitId;
  @Output() test: EventEmitter<any> = new EventEmitter<any>();

  public disableButton = false;
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
    this.disableButton = true;
    const data = {
      course_id: this.courseId,
      unit_id: this.unitId,
      type: 'content',
      content: JSON.stringify(this.form.value)
    };

    this.courseService.newSlide(data).subscribe(r => {
      this.test.emit(r);
    });
  }

}
