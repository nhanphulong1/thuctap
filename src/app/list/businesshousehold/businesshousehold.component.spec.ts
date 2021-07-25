import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesshouseholdComponent } from './businesshousehold.component';

describe('BusinesshouseholdComponent', () => {
  let component: BusinesshouseholdComponent;
  let fixture: ComponentFixture<BusinesshouseholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesshouseholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesshouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
