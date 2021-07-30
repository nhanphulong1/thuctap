import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistics1Component } from './statistics1.component';

describe('Statistics1Component', () => {
  let component: Statistics1Component;
  let fixture: ComponentFixture<Statistics1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statistics1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statistics1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
