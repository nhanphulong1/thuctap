import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistics5Component } from './statistics5.component';

describe('Statistics5Component', () => {
  let component: Statistics5Component;
  let fixture: ComponentFixture<Statistics5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statistics5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statistics5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
