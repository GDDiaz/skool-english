import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidePdfComponent } from './slide-pdf.component';

describe('SlidePdfComponent', () => {
  let component: SlidePdfComponent;
  let fixture: ComponentFixture<SlidePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
