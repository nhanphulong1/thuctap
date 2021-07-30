import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistics3Component } from './statistics3.component';

describe('Statistics3Component', () => {
  let component: Statistics3Component;
  let fixture: ComponentFixture<Statistics3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statistics3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statistics3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
