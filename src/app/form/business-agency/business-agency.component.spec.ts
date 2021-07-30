import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAgencyComponent } from './business-agency.component';

describe('BusinessAgencyComponent', () => {
  let component: BusinessAgencyComponent;
  let fixture: ComponentFixture<BusinessAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
