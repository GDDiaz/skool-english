import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSlideComponent } from './show-slide.component';

describe('ShowSlideComponent', () => {
  let component: ShowSlideComponent;
  let fixture: ComponentFixture<ShowSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
