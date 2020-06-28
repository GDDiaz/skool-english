import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityChoiceFormComponent } from './activity-choice-form.component';

describe('ActivityChoiceFormComponent', () => {
  let component: ActivityChoiceFormComponent;
  let fixture: ComponentFixture<ActivityChoiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityChoiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
