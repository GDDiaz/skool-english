import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideQuizComponent } from './slide-quiz.component';

describe('SlideQuizComponent', () => {
  let component: SlideQuizComponent;
  let fixture: ComponentFixture<SlideQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
