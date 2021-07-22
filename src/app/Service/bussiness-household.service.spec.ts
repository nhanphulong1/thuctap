import { TestBed } from '@angular/core/testing';

import { BussinessHouseholdService } from './bussiness-household.service';

describe('BussinessHouseholdService', () => {
  let service: BussinessHouseholdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BussinessHouseholdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
