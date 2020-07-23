import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachFormComponent } from './attach-form.component';

describe('AttachFormComponent', () => {
  let component: AttachFormComponent;
  let fixture: ComponentFixture<AttachFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
