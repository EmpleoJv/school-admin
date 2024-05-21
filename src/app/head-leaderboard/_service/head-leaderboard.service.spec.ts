import { TestBed } from '@angular/core/testing';

import { HeadLeaderboardService } from './head-leaderboard.service';

describe('HeadLeaderboardService', () => {
  let service: HeadLeaderboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadLeaderboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
