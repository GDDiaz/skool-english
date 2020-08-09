import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements OnInit {
  @Input() courseId;
  @Input() unitEdit =  null;
  @Input() position = 0;
  @Output() unit: EventEmitter<any> = new EventEmitter<any>();
  types = ['Listening', 'Speaking', 'Writing', 'Reading', 'Vocabulary'];
  public form = this.fb.group({
    name: ['', Validators.required],
    type: ['Listening']
  });
  public action = 'new';
  public title = 'Nueva unidad';

  public disableButton = false;

  constructor(private fb: FormBuilder, private courseService: CoursesService) { }

  ngOnInit() {
    if (this.unitEdit !== null) {
      this.title = 'Editar unidad';
      this.action = 'edit';
      this.form.patchValue(this.unitEdit);
    }
  }

  onSubmit() {
    this.disableButton = true;
    const values = this.form.value;
    if (this.action === 'new') { 
      // tslint:disable-next-line:no-string-literal
      values['course_id'] = this.courseId;
      // tslint:disable-next-line:no-string-literal
      values['position'] = this.position;
      this.courseService.newUnit(values).subscribe(r => {
        // tslint:disable-next-line:no-string-literal
        r['slides'] = [];
        this.unit.emit(r);
      }, error => console.error(error));

    } else {
      this.courseService.editUnit(this.unitEdit.id, values).subscribe(r => {
        this.unit.emit(r);
      }, error => console.error(error));
    }
    
  }

}
