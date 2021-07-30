import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistics4Component } from './statistics4.component';

describe('Statistics4Component', () => {
  let component: Statistics4Component;
  let fixture: ComponentFixture<Statistics4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statistics4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statistics4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
