import { TestBed } from '@angular/core/testing';

import { EligibleService } from './eligible.service';

describe('EligibleService', () => {
  let service: EligibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EligibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
