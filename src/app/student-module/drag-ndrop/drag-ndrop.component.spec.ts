import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNdropComponent } from './drag-ndrop.component';

describe('DragNdropComponent', () => {
  let component: DragNdropComponent;
  let fixture: ComponentFixture<DragNdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragNdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
