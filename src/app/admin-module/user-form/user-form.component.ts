import { Component, OnInit, Input, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

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
  public formData: FormData = null;
  public title;
  public action = 'new';
  public form = this.fb.group({
    name: ['', Validators.required],
    identification: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email ]],
    phone_number: [''],
    password: ['', Validators.required],
    confirm_password: [''],
    photo: ['']
  }, {
    validator: this.ConfirmedValidator('password', 'confirm_password')
  });

  constructor(private fb: FormBuilder,
              private courseService: CoursesService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer
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
    if (this.formData !==  null) {
      this.sendImage();
    } else {
      this.sendRequest();
    }
  }

  private sendRequest() {
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
        photo: values.photo
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
        photo: values.photo
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

  sanitizerUrl(url, addApiUrl) {
    if (addApiUrl) {
      url = `${environment.baseUrl + url}` ;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setFormDataImage(event) {
    this.formData = event;
  }

  private sendImage() {
    this.courseService.uploadFiles(this.formData).subscribe(
      response =>  {
        this.form.get('photo').patchValue(response.path);
        this.sendRequest();
      },
      error => console.error(error)
    );
  }

  deletePhoto() {
    this.form.get('photo').patchValue(null);
  }

  hasImageFile() {
    if (this.form.get('photo').value !==  null && this.form.get('photo').value !== '') {
      return this.form.get('photo').value;
    }
    return false;
  }

}
