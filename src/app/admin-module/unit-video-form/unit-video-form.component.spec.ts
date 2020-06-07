import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitVideoFormComponent } from './unit-video-form.component';

describe('UnitVideoFormComponent', () => {
  let component: UnitVideoFormComponent;
  let fixture: ComponentFixture<UnitVideoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitVideoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
