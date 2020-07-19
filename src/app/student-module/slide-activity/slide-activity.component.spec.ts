import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideActivityComponent } from './slide-activity.component';

describe('SlideActivityComponent', () => {
  let component: SlideActivityComponent;
  let fixture: ComponentFixture<SlideActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
