import { TestBed } from '@angular/core/testing';

import { HospitalAdminService } from './hospital-admin.service';

describe('HospitalAdminService', () => {
  let service: HospitalAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
