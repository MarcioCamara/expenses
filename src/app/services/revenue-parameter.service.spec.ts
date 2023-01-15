import { TestBed } from '@angular/core/testing';

import { RevenueParameterService } from './revenue-parameter.service';

describe('RevenueParameterService', () => {
  let service: RevenueParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenueParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
