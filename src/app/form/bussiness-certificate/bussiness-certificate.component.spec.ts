import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessCertificateComponent } from './bussiness-certificate.component';

describe('BussinessCertificateComponent', () => {
  let component: BussinessCertificateComponent;
  let fixture: ComponentFixture<BussinessCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
