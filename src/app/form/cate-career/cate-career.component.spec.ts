import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CateCareerComponent } from './cate-career.component';

describe('CateCareerComponent', () => {
  let component: CateCareerComponent;
  let fixture: ComponentFixture<CateCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CateCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
