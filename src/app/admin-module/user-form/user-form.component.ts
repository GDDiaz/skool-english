import { Component, OnInit, Input, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  type;
  user;
  userId;
  @Output() response;

  public disableButton = false;
  public title;
  public action = 'new';
  public form = this.fb.group({
    name: ['', Validators.required],
    identification: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email ]],
    phone_number: [''],
    password: ['', Validators.required],
    confirm_password: ['']
  }, {
    validator: this.ConfirmedValidator('password', 'confirm_password')
  });

  constructor(private fb: FormBuilder,
              private courseService: CoursesService,
              private route: ActivatedRoute,
              private router: Router
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.type = data.type;
    });

    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.userId = params.params.id;
        this.title = (this.type === 0) ? 'Editar estudiante' : 'Editar docente' ;
        this.action = 'edit';
        this.courseService.getUserById(this.userId).subscribe(response => {
          if (response) {
            this.form.patchValue(response);
          }
        });
      } else {
        this.title = (this.type === 0) ? 'Nuevo estudiante' : 'Nuevo docente' ;
      }
  }, error => console.error(error));
  }

  onSubmit() {
    this.disableButton = true;
    const values = this.form.value;
    if (this.action === 'new') {
      const data = {
        type: this.type,
        name: values.name,
        email: values.email,
        password: values.password,
        identification: values.identification,
        phone_number: values.phone_number,
      };

      this.courseService.newUser(data).subscribe(r => {
        if (this.type === 0) {
          this.router.navigate(['/admin/students']);
        } else {
          this.router.navigate(['/admin/teachers']);
        }
      });
    } else {
      const data = {
        type: this.type,
        name: values.name,
        email: values.email,
        password: values.password,
        identification: values.identification,
        phone_number: values.phone_number,
      };
      this.courseService.editUser(this.userId, data).subscribe(r => {
        if (this.type === 0) {
          this.router.navigate(['/admin/students']);
        } else {
          this.router.navigate(['/admin/teachers']);
        }
      });
    }
  }

  private ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

}
