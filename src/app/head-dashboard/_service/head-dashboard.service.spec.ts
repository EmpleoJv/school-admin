import { TestBed } from '@angular/core/testing';

import { HeadDashboardService } from './head-dashboard.service';

describe('HeadDashboardService', () => {
  let service: HeadDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
