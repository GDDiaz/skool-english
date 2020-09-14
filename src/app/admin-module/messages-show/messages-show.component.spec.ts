import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesShowComponent } from './messages-show.component';

describe('MessagesShowComponent', () => {
  let component: MessagesShowComponent;
  let fixture: ComponentFixture<MessagesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
