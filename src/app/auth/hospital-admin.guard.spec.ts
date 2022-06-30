import { TestBed } from '@angular/core/testing';

import { HospitalAdminGuard } from './hospital-admin.guard';

describe('HospitalAdminGuard', () => {
  let guard: HospitalAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HospitalAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
