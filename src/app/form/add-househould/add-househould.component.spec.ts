import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHousehouldComponent } from './add-househould.component';

describe('AddHousehouldComponent', () => {
  let component: AddHousehouldComponent;
  let fixture: ComponentFixture<AddHousehouldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHousehouldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHousehouldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
